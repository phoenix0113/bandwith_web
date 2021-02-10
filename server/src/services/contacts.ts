import { Contact } from '../models';
import {
  CreateContactRequest,
  Document,
  GetContactListResponse,
  RemoveContactRequest,
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
}
