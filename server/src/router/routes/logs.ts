import { Router } from 'express';
import { LogsController } from '../../controllers/logs';

export const logsRouter = Router();

logsRouter.post('/', LogsController.writeLog);
