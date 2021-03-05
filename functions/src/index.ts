/**
 * FIREBASE FUNCTIONS FOR THE CONTENT AND USER MANAGEMENT SYSTEMS OF JACOBIANMATTHEWS.COM.
 *
 * @copyright 2020 Jacob Ian Matthews
 * @license Apache-2.0
 */

import * as admin from 'firebase-admin';

admin.initializeApp({
  storageBucket: 'jacobianmatthews-portfolio.appspot.com',
});

/**
 * User Management Functions
 */
export {
  createUser,
  updateAdmins,
  updateAuthors,
  removeAdmin,
  removeAuthor,
} from './users/users.functions';

/**
 * Content Management Functions
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
 * Email Functions
 */
export { notifyNewPost } from './emails/emails.functions';
