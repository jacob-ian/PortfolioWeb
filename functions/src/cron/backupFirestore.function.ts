import * as functions from 'firebase-functions';
import { google } from 'googleapis';

let privateKey = functions.config().backupserviceaccount;
let projectId = functions.config().projectId;

const googleAuth = new google.auth.JWT({
  scopes: [
    'https://www.googleapis.com/auth/datastore',
    'https://www.googleapis.com/auth/cloud-platform',
  ],
  email: privateKey.email,
  key: privateKey.key,
});

const firestore = google.firestore({
  version: 'v1beta2',
  auth: googleAuth,
});

export const backupFirestore = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('Australia/Sydney')
  .onRun(async () => {
    let timestamp = new Date().toISOString();

    await googleAuth.authorize();
    console.log('Beginning Firestore backup.');
    return await firestore.projects.databases.exportDocuments({
      name: `projects/${projectId}/databases/(default)`,
      requestBody: {
        outputUriPrefix: `gs://${projectId}-firestore-backup/${timestamp}`,
      },
    });
  });
