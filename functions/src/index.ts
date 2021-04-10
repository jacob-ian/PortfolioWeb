import { FunctionParser } from 'firebase-backend';
import * as functions from 'firebase-functions';
const { app } = require('./server/main');

exports = new FunctionParser(__dirname, exports).exports;
exports.ssr = functions.https.onRequest(app());
