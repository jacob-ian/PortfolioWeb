import { FunctionParser } from 'firebase-backend';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const { app } = require('./server/main');

admin.initializeApp();

exports = new FunctionParser(__dirname, exports).exports;
exports.ssr = functions.https.onRequest(app());
