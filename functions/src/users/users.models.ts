/**
 * A user database model
 */
export interface User {
  uid: string; // the unique ID
  name: string; // the display name of the user
  imageUrl: string | undefined; // the display image of the user
  email: string; // the user's email address
  roles: string[]; // the user's assigned roles
  posts: string[]; // the IDs of the user's created posts
  dateCreated: number; // the date of user registration
}

/**
 * The custom claims for a JWT.
 */
export interface CustomClaims {
  admin?: boolean; // administrator flag
  author?: boolean; // author flag
}
