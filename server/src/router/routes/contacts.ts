import { Router } from 'express';
import { ContactsController } from '../../controllers';

export const contactRouter = Router();

contactRouter.post('/', ContactsController.addContact);
contactRouter.get('/', ContactsController.getContacts);
contactRouter.delete('/:contactPerson', ContactsController.deleteContact);
