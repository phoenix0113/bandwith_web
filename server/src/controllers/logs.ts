import { Response } from 'express';
import fs from 'fs';
import path from 'path';

import { CrudController } from './crudController';
import { TypedRequest } from '../types/Request';
import { SendLogsRequest } from '../../../client/src/shared/interfaces';

export class LogsController extends CrudController {
  static async writeLog(req: TypedRequest<SendLogsRequest>, res: Response) {
    const pathToAppend = path.join(__dirname, '../../logs/', req.body.userId);

    console.log(`> Appending to ${pathToAppend}. Logs: `, req.body.logs);

    fs.appendFile(pathToAppend, req.body.logs, (err) => {
      if (err) throw err;

      console.log('> Log file was updated');
      res.send({ success: true });
    });
  }
}
