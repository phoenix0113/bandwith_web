import { Contact } from '../models';
import { User } from '../models';
import {
  CreateContactRequest,
  Document,
  GetContactListResponse,
  RemoveContactRequest,
  ImportContactsRequest,
  ImportContactsResponse,
  ImportedContactItem,
} from '../../../client/src/shared/interfaces';

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

      const phones: Array<string> = [];
      contacts.forEach((c) => {
        phones.push(...c.phones);
      });

      const regexString = phones.join('|');

      console.log(
        `[Contacts import] Seaching for users with regex: ${regexString}`
      );

      const matchedUsers = await User.find({
        phone: {
          $regex: regexString,
        },
      }).select('_id phone');

      if (!matchedUsers.length) {
        console.log(
          "[Contacts import] Didn't find any app users based on the provided contacts. Setting `contactsImported` to true"
        );
        targetUser.contactsImported = true;
        await targetUser.save();

        return { profile: targetUser, updated: false };
      }

      console.log(
        `[Contacts import] found ${matchedUsers.length} users: `,
        matchedUsers
      );

      const newContacts: Array<ImportedContactItem> = [];

      matchedUsers.forEach((matchedUser) => {
        const phoneContact = contacts.find((c) => {
          const regex = new RegExp(c.phones.join('|').replace('+', '\\+'));
          return !!matchedUser.phone.match(regex);
        });

        if (!phoneContact) {
          console.error(
            "[Contacts import] something went wrong while searching back for phone's contact by phone number. Matched user: ",
            matchedUser
          );
          throw new Error(
            "[Contacts import] something went wrong while searching back for phone's contact by phone number"
          );
        }

        newContacts.push({
          user: matchedUser._id,
          recordId: phoneContact.recordId,
          name: phoneContact.name,
        });
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

      console.log("[Contacts import] update user's profile: ", profile);

      return { profile, updated: true };
    } catch (e) {
      throw e;
    }
  }
}
