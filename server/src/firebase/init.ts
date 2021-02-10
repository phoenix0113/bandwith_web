import admin from 'firebase-admin';

import { conf } from '../config/config'

const serviceAccount = require('../config/firebase-credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: conf.firebaseDatabase,
});

export const messaging = admin.messaging();