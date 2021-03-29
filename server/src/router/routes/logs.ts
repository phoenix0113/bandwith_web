import { Router } from 'express';
import { LogsController } from '../../controllers/logs';

import { PATH } from '../../../../client/src/shared/routes';

export const logsRouter = Router();

logsRouter.post('/', LogsController.writeLog);

logsRouter.post(`/${PATH.SERVER_SIDE}`, LogsController.showLog);
