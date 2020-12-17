/**
 *
 * FIREBASE FUNCTIONS FOR THE CONTENT AND USER MANAGEMENT SYSTEMS OF JACOBIANMATTHEWS.COM.
 *
 * @author Jacob Ian Matthews
 * @copyright 2020 Jacob Ian Matthews
 * @license Apache-2.0
 */

import * as admin from 'firebase-admin';

// Initiliaze Firebase
admin.initializeApp({
  storageBucket: 'jacobianmatthews-portfolio.appspot.com',
});

/**
 * USER-RELATED FUNCTIONS
 */
export {
  createUser,
  updateAdmins,
  updateAuthors,
  removeAdmin,
  removeAuthor,
} from './users/users.functions';

/**
 * BLOG-RELATED FUNCTIONS
 */
export {
  createSnippet,
  updateSnippet,
  deleteSnippet,
  deletePostFiles,
  registerToken,
  pushNotify,
} from './blog/blog.functions';

/**
 * EMAIL-RELATED FUNCTIONS
 */
export { notifyNewPost } from './emails/emails.functions';
