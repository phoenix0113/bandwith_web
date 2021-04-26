import { Router } from 'express';
import { ContactsController } from '../../controllers';
import { PATH } from '../../../../client/src/shared/routes';

export const contactRouter = Router();

contactRouter.post('/', ContactsController.addContact);
contactRouter.get('/', ContactsController.getContacts);
contactRouter.delete('/:contactPerson', ContactsController.deleteContact);
contactRouter.post(`/${PATH.IMPORT}`, ContactsController.importContacts);
