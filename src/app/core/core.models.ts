import firebase from 'firebase/app';
import 'firebase/firestore';

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
 * An object containing open graph details
 */
export interface MetaTags {
  title: string; // the page title
  description: string; // the page description
  image?: string; // the image URL of the page
  type?: 'article' | 'website';
  article?: {
    published_time: string; // ISO8601 date time
    modified_time?: string; // ISO8601 date time
    author: string; // the author's name
    section: string; // the overarching category
    tag: string[]; // keywords for the article
  };
}

/**
 * An error produced by the images service.
 */
export interface ImageServiceError {
  code: number; // the HTTP Code
  error: string; // the error name
  description: string; // the human-readable description of the error
}
