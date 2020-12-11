/**
 *
 * FIREBASE FUNCTIONS FOR THE CONTENT AND USER MANAGEMENT SYSTEMS OF JACOBIANMATTHEWS.COM.
 *
 * @author Jacob Ian Matthews
 * @copyright 2020 Jacob Ian Matthews
 * @license Apache-2.0
 */

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
  registerToken,
  pushNotify,
} from './blog/blog.functions';

/**
 * EMAIL-RELATED FUNCTIONS
 */
export { notifyNewPost } from './emails/emails.functions';
