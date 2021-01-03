import firebase from 'firebase/app';
import 'firebase/firestore';

/**
 * A user database model
 */
export interface User {
  uid: string; // the unique ID
  name: string; // the display name of the user
  imageUrl: string | undefined; // the display image of the user
  email: string; // the user's email address
  roles: string[]; // the user's assigned roles
  posts: string[] | firebase.firestore.FieldValue; // the IDs of the user's created posts
  comments: string[]; // the IDs of the the user's posted comments
  draftCount: number | firebase.firestore.FieldValue;
  dateCreated: number; // the date of user registration
  notifications: {
    email: boolean; // if the user is subscribed to post notifications
  };
  isRegistered: boolean; // Check if the user has been through the registration flow
  isImageCustom: boolean; // Check if the user has a custom uploaded image
}

/**
 * A user metadata model
 */
export interface UserMetadata {
  refreshTime: number; // the time of update of the document
}

/**
 * The custom claims for a JWT.
 */
export interface CustomClaims {
  admin?: boolean; // administrator flag
  author?: boolean; // author flag
}

/**
 * A sign-in/sign-up redirect query
 */
export interface RedirectQuery {
  uid?: string; // the user's id
  redirect_path?: string; // a path to redirect the user to
  redirect_params?: any; // any additional query parameters
  error?: string; // the error code
  error_description?: string; // the human-readable error
}
