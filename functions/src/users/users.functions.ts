/**
 * This file contains the back-end functions for user management on Firebase.
 *
 * @author Jacob Ian Matthews
 */

import * as functions from 'firebase-functions';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import * as admin from 'firebase-admin';
import { CustomClaims, User } from './users.models';

// Initiliaze Firebase
admin.initializeApp();
const firestore = admin.firestore();

/**
 * Create a user database entry and assign its group.
 */
export const createUser = functions.auth
  .user()
  .onCreate(async (user: UserRecord) => {
    // Get the user details
    const { email, uid, displayName, photoURL } = user;

    // Check that the important details exist
    if (!email || !displayName) {
      // Throw an error
      throw `Could not register user: '${uid}' due to missing details.`;
    }

    // Check the admin and authors databases for the email address
    try {
      var adminRef = await firestore.doc(`/admins/${email}`).get();
      var authorRef = await firestore.doc(`/authors/${email}`).get();
    } catch (err) {
      throw err;
    }

    // Create a variable for the roles
    var roles = ['user'];

    // Create booleans for admin and author
    var adminFlag = false;
    var authorFlag = false;

    // Check if the email address exists in the admins database
    if (adminRef.exists) {
      // We can add admin to the roles
      roles.push('admin');
      adminFlag = true;
    }

    // Check if the email address exists in the authors database
    if (authorRef.exists) {
      // We can add author to the roles
      roles.push('author');
      authorFlag = true;
    }

    // Check if either author or admin has been triggered
    if (authorFlag || adminFlag) {
      // We need to update the claim's on the user's auth token
      // Create custom claims
      const customClaims: CustomClaims = {
        author: authorFlag,
        admin: adminFlag,
      };

      // Update the claims
      try {
        await updateCustomClaims(uid, customClaims);
      } catch (err) {
        // Log the error
        console.log(err);
      }
    }

    // Create the user document
    const doc: User = {
      uid,
      email,
      name: displayName,
      imageUrl: photoURL,
      posts: [],
      roles,
      dateCreated: Date.now(),
    };

    // Add the document to the database
    try {
      await firestore.collection('users').doc(`/users/${uid}`).set(doc);
    } catch (err) {
      throw err;
    }
  });

/**
 * Listen to changes in the admin collection and update/remove any user records.
 */
export const updateAdmins = functions.firestore
  .document('/admins/{email}')
  .onCreate(async (snap) => {
    // Get the new address
    const email = snap.data().email;

    // Search the user's database for the email
    try {
      var userDocRef = await firestore
        .collection('users')
        .where('email', '==', email)
        .get();
    } catch (err) {
      throw err;
    }

    // Check if any documents were returned
    if (userDocRef.empty) {
      // No users yet with that address, don't update any
      return;
    }

    // Update the user accounts with that email
    userDocRef.forEach(async (doc) => {
      // Get the user Id
      const userId = doc.data().uid;

      // Update the user's custom JWT claims
      try {
        await updateCustomClaims(userId, { admin: true });
      } catch (err) {
        // Log the error
        console.error(err);
      }

      // Update the document with the admin role
      try {
        await doc.ref.update({
          roles: admin.firestore.FieldValue.arrayUnion('admin'),
        });
      } catch (err) {
        throw err;
      }
    });
  });

/**
 * Remove admin privileges from an account.
 */
export const removeAdmin = functions.firestore
  .document('/admins/{email}')
  .onDelete(async (snap) => {
    // Get the email address
    const email = snap.data().email;

    // Update the user document if it exists
    try {
      var userRef = await firestore
        .collection('users')
        .where('email', '==', email)
        .get();
    } catch (err) {
      throw err;
    }

    // Check if any documents exist
    if (userRef.empty) {
      // Nothing to delete
      return;
    }

    // Loop through, removing the admin role
    userRef.docs.forEach(async (doc) => {
      // Get the user Id
      const userId = doc.data().uid;

      // Update the JWT claims
      try {
        await updateCustomClaims(userId, { admin: false });
      } catch (err) {
        console.error(err);
      }

      try {
        // Update the roles object
        await doc.ref.update({
          roles: admin.firestore.FieldValue.arrayRemove('admin'),
        });
      } catch (err) {
        throw err;
      }
    });
  });

/**
 * Listen to changes in the authors collection and update/remove any user records.
 */
export const updateAuthors = functions.firestore
  .document('/authors/{email}')
  .onCreate(async (snap) => {
    // Get the new address
    const email = snap.data().email;

    // Search the user's database for the email
    try {
      var userDocRef = await firestore
        .collection('users')
        .where('email', '==', email)
        .get();
    } catch (err) {
      throw err;
    }

    // Check if any document were returned
    if (userDocRef.empty) {
      // No users yet with that address, don't update any
      return;
    }

    // For all of the accounts with that email, add the admin role
    userDocRef.docs.forEach(async (doc) => {
      // Get the user Id
      const userId = doc.data().uid;

      // Update the JWT claims
      try {
        await updateCustomClaims(userId, { author: true });
      } catch (err) {
        console.error(err);
      }

      // Set the roles object in the user document
      try {
        await doc.ref.update({
          roles: admin.firestore.FieldValue.arrayUnion('author'),
        });
      } catch (err) {
        throw err;
      }
    });
  });

/**
 * Remove author privileges from an account
 */
export const removeAuthor = functions.firestore
  .document('/authors/{email}')
  .onDelete(async (snap) => {
    // Get the email address
    const email = snap.data().email;

    // Update the user document if it exists
    try {
      var userRef = await firestore
        .collection('users')
        .where('email', '==', email)
        .get();
    } catch (err) {
      throw err;
    }

    // Check if any documents exist
    if (userRef.empty) {
      // Nothing to delete
      return;
    }

    // Loop through, removing the admin role
    userRef.docs.forEach(async (doc) => {
      // Get the user Id
      const userId = doc.data().uid;

      // Update the JWT claims
      try {
        await updateCustomClaims(userId, { author: false });
      } catch (err) {
        console.error(err);
      }

      try {
        // Update the roles object
        await doc.ref.update({
          roles: admin.firestore.FieldValue.arrayRemove('author'),
        });
      } catch (err) {
        throw err;
      }
    });
  });

/**
 *
 * PRIVATE FUNCTIONS
 *
 */

/**
 * Update the JWT custom claims for a user
 * @param userId the user Id of the account to update the claims on
 * @param claims the custom claims for the user
 * @returns void
 */
async function updateCustomClaims(
  userId: string,
  claims: CustomClaims
): Promise<void> {
  // Call the Firebase admin to update the claims
  return admin
    .auth()
    .setCustomUserClaims(userId, claims)
    .then(async () => {
      // Update the user's metadata document to tell the client to refresh the user's token
      await firestore
        .doc(`/metadata/${userId}`)
        .set({ refreshTime: new Date().getTime() });
    })
    .catch((err) => {
      // Log the error
      return console.error(
        `Couldn't add custom claims to user: ${userId}. Error: ${err}.`
      );
    });
}
