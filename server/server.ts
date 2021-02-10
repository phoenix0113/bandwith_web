import { createServer } from 'http';
import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import consoleStamp from 'console-stamp';
import jwt from 'express-jwt';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger-config.json';
import { connectToMongo } from './src/db';
import { router } from './src/router';
import { conf } from './src/config';
import { PATH, API } from '../client/src/shared/routes';
import {
  SocketServer,
  StorageHandler,
  /* UsersService */
} from './src/services';

consoleStamp(console, { pattern: 'dd/mm/yyyy HH:MM:ss.l' });
dotenv.config();

const main = async () => {
  const jwtProtect = jwt({
    secret: conf.auth.secret,
    algorithms: [conf.auth.algorithm],
  });

  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  app.use(
    `/${PATH.API_DOCS}`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );

  app.use(`/${PATH.API}/${PATH.USER}/*`, jwtProtect);
  app.use(`/${API.USER_PROFILE}`, jwtProtect);
  app.use(`/${API.NOTIFICATIONS}`, jwtProtect);
  app.use(`/${API.NOTIFICATIONS}/*`, jwtProtect);
  app.use(`/${API.USER_CONTACTS}`, jwtProtect);
  app.use(`/${PATH.API}/${PATH.RECORD}/*`, jwtProtect);
  app.use(`/${PATH.API}/${PATH.RECORD}`, jwtProtect);
  app.use(`/${PATH.API}`, router);

  app.use(express.static(path.join(__dirname, conf.frontendPath)));

  app.get(`/${PATH.AUTH}`, (req, res) => {
    res.send({ cloud: conf.cloud });
  });
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, conf.frontendPath, 'index.html'))
  );

  await connectToMongo();

  await StorageHandler.init(conf.storage);

  // UsersService.updateUsers();

  const httpServer = createServer(app);

  httpServer.listen(conf.port, () =>
    console.log(`Server started on port ${conf.port}`)
  );

  new SocketServer(httpServer);
};

main();
