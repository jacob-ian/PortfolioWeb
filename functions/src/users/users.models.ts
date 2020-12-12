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
