import { FieldValue } from '@google-cloud/firestore';

/**
 * A user database model
 */
export interface User {
  uid: string; // the unique ID
  name: string; // the display name of the user
  imageUrl: string; // the display image of the user
  email: string; // the user's email address
  roles: string[]; // the user's assigned roles
  posts: string[]; // the IDs of the user's created posts
  comments: string[]; // the IDs of the the user's posted comments
  draftCount: number | firebase.default.firestore.FieldValue;
  dateCreated: number; // the date of user registration
}

/**
 * A user metadata model
 */
export interface UserMetadata {
  refreshTime: number; // the time of update of the document
}

/**
 * An error produced by the images service.
 */
export interface ImageServiceError {
  code: number; // the HTTP Code
  error: string; // the error name
  description: string; // the human-readable description of the error
}
