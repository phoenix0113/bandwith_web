import {
  isValidPhoneNumber,
  CountryCode,
  isPossiblePhoneNumber,
  getCountries,
} from 'libphonenumber-js';
import { uniqBy } from 'lodash';

import { Contact, IUser } from '../models';
import { User } from '../models';
import {
  CreateContactRequest,
  Document,
  GetContactListResponse,
  RemoveContactRequest,
  ImportContactsRequest,
  ImportContactsResponse,
  ImportedContactItem,
  ContactImportItem,
} from '../../../client/src/shared/interfaces';

const removeImpossibleNumbers = (
  contacts: ContactImportItem[]
): ContactImportItem[] => {
  const allCountriesCodes = getCountries();

  let skippedContactsCounter = 0;
  let skippedPhones: string[] = [];

  const cleaned = contacts
    .map((contact) => {
      contact.phones = contact.phones.filter((phone) => {
        for (let i = 0; i < allCountriesCodes.length; i++) {
          if (isPossiblePhoneNumber(phone, allCountriesCodes[i])) {
            return true;
          }
        }
        skippedPhones.push(phone);
        return false;
      });

      if (!contact.phones.length) {
        skippedContactsCounter++;
        return null;
      }

      return contact;
    })
    .filter(Boolean) as ContactImportItem[];

  console.log(
    `[Contacts import] Imported contacts were cleaned up from impossible number. Removed contacts: ${skippedContactsCounter}. Skipped phone numbers: ${skippedPhones.length}. Actual skipped phones: `,
    skippedPhones
  );

  return cleaned || [];
};

const MAX_PHONES_FOR_SINGLE_REQUEST = 500;

const fetchByChunks = async (
  contacts: ContactImportItem[],
  self_id: string
): Promise<IUser[]> => {
  try {
    const phones: Array<string> = [];
    contacts.forEach((c) => {
      phones.push(...c.phones);
    });

    // chunk and regexArray correspond to a single request to the DB
    const chunks = Math.ceil(phones.length / MAX_PHONES_FOR_SINGLE_REQUEST);
    const regexArray: Array<string> = [];

    if (chunks === 1) {
      const regexString = phones.join('|');
      regexArray.push(regexString);
    } else {
      for (let i = 0; i < chunks; i++) {
        const chunk = phones.slice(
          i * MAX_PHONES_FOR_SINGLE_REQUEST,
          i * MAX_PHONES_FOR_SINGLE_REQUEST + MAX_PHONES_FOR_SINGLE_REQUEST
        );

        const regexString = chunk.join('|');
        regexArray.push(regexString);
      }
    }

    console.log(
      `[Contacts import] Found ${phones.length} phones. Created ${regexArray.length} regex chunkds`
    );

    const promises = regexArray.map((regexString) => {
      return User.find({
        phone: {
          $regex: regexString,
        },
        _id: {
          $ne: self_id, // removing ourselves from the list
        },
        role: "user",
      }).select('_id phone countryCode');
    });

    const resolvedArray = await Promise.all(promises);

    const users: IUser[] = [];
    resolvedArray.forEach((resolved) => {
      users.push(...resolved);
    });

    const uniqueUsers = uniqBy(users, '_id');

    console.log(
      `[Contacts import] Fetched ${users.length} from the DB. Unique users: ${uniqueUsers.length}`
    );

    return uniqueUsers;
  } catch (e) {
    throw e;
  }
};

export class ContactsService {
  static async createContact(
    { contactPerson }: CreateContactRequest,
    contactOwner: string
  ): Promise<Document> {
    try {
      let c = await Contact.findOne({ contactOwner, contactPerson });
      let c1 = await Contact.findOne({
        contactOwner: contactPerson,
        contactPerson: contactOwner,
      });

      if (c || c1) {
        throw { status: 400, message: 'You already have such a contact' };
      } else {
        c = new Contact({ contactOwner, contactPerson });
        c1 = new Contact({
          contactOwner: contactPerson,
          contactPerson: contactOwner,
        });

        await c.save();
        await c1.save();

        return { _id: c._id.toString() };
      }
    } catch (e) {
      throw e;
    }
  }

  static async getAllUserContacts({
    _id,
  }: Document): Promise<GetContactListResponse> {
    const contacts = await Contact.find({ contactOwner: _id })
      .select('-contactOwner -_id')
      .populate({
        path: 'contactPerson',
        select: '-password -email',
      });

    return {
      contacts: Object.assign([], contacts).map(
        ({ contactPerson: { _id, name, imageUrl } }) => ({
          _id,
          name,
          imageUrl,
        })
      ),
    };
  }

  static async deleteContact(
    { contactPerson }: RemoveContactRequest,
    { _id }: Document
  ) {
    try {
      await Contact.findOneAndRemove({ contactPerson, contactOwner: _id });
      await Contact.findOneAndRemove({
        contactPerson: _id,
        contactOwner: contactPerson,
      });
    } catch (err) {
      throw { status: 400, message: 'Not found' };
    }
  }

  static async deleteContactById({ _id }: Document) {
    try {
      await Contact.findByIdAndRemove(_id);
    } catch (err) {
      throw { status: 400, message: 'Not found' };
    }
  }

  static async importContacts(
    { contacts }: ImportContactsRequest,
    _id: string
  ): Promise<ImportContactsResponse> {
    try {
      const targetUser = await User.findById(_id).select('-password');

      if (!targetUser) {
        throw { status: 400, message: 'User Not found' };
      }

      // all "possible" contacts
      const cleanupContacts = removeImpossibleNumbers(contacts);

      // all users that match at least to one "possible" contact
      const matchedUsers = await fetchByChunks(cleanupContacts, _id);

      if (!matchedUsers.length) {
        console.log(
          "[Contacts import] Didn't find any app users based on the provided contacts. Setting `contactsImported` to true"
        );
        targetUser.contactsImported = true;
        targetUser.contacts = [];

        await targetUser.save();

        return { profile: targetUser, updated: false };
      }

      const newContacts: Array<ImportedContactItem> = [];

      matchedUsers.forEach((matchedUser) => {
        const phoneContacts = cleanupContacts.filter((c) => {
          const regex = new RegExp(c.phones.join('|').replace('+', '\\+'));
          return !!matchedUser.phone.match(regex);
        });

        if (!phoneContacts.length) {
          console.error(
            "[Contacts import] something went wrong while searching back for phone's contact by phone number. Matched user: ",
            matchedUser
          );
          throw new Error(
            "[Contacts import] something went wrong while searching back for phone's contact by phone number"
          );
        }

        // Note: it's not likely that we will find multiple phoneContact for one matchedUser
        if (phoneContacts.length > 1) {
          console.warn(
            '[Contacts import] Found more than 1 phoneContact for matchedUser. Phone contact and matched user: ',
            phoneContacts,
            matchedUser
          );
        }

        for (let i = 0; i < phoneContacts.length; i++) {
          const atLeastOneValid = phoneContacts[i].phones.some((phone) => {
            return isValidPhoneNumber(
              phone,
              matchedUser.countryCode as CountryCode
            );
          });

          if (atLeastOneValid) {
            newContacts.push({
              user: matchedUser._id,
              recordId: phoneContacts[i].recordId,
              name: phoneContacts[i].name,
            });
            break;
          } else {
            console.log(
              `> All imported phones from 'phoneContact' aren't valid for matched phone ${matchedUser.phone} with country. 'phoneContact' that matched regex: `,
              phoneContacts[i]
            );
          }
        }
      });

      console.log(
        `[Contacts import] Found contacts for user ${targetUser.name}: `,
        newContacts
      );

      targetUser.contactsImported = true;
      targetUser.contacts = newContacts;

      await targetUser.save();

      const profile = await targetUser
        .populate({
          path: 'contacts.user',
          select: '_id name imageUrl',
        })
        .execPopulate();

      return { profile, updated: true };
    } catch (e) {
      throw e;
    }
  }
}
