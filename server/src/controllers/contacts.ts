import { Request, Response } from 'express';
import { CrudController } from './crudController';
import { ContactsService } from '../services';

export class ContactsController extends CrudController {
  static async addContact(req: Request, res: Response) {
    await ContactsController.processRequest(req, res, async () => {
      await ContactsService.createContact(
        {
          contactPerson: req.body.contactPerson,
        },
        req['user'].userId
      );

      res.send({ success: true });
    });
  }

  static async getContacts(req: Request, res: Response) {
    await ContactsController.processRequest(req, res, async () => {
      res.send(
        await ContactsService.getAllUserContacts({ _id: req['user'].userId })
      );
    });
  }

  static async deleteContact(req: Request, res: Response) {
    await ContactsController.processRequest(req, res, async () => {
      await ContactsService.deleteContact(
        { contactPerson: req.params.contactPerson },
        { _id: req['user'].userId }
      );

      res.send({ success: true });
    });
  }
}
