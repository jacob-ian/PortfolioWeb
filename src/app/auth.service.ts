import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
  dateCreated: number; // the date of user registration
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * The user observable
   */
  user: Observable<User>;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    // Fetch the firestore document from the auth state and bind it to the user
    // observable
    this.user = this.afAuth.authState.pipe(
      switchMap((user) => {
        // Check if the user is logged in
        if (user) {
          // Return the firestore document
          this.afs.doc<User>(`/users/${user.uid}`).valueChanges();
        } else {
          // We aren't logged in, return null
          return of(null);
        }
      })
    );
  }

  /**
   * Fetch the currently logged in user.
   */
  async getSignedInUser(): Promise<User> {
    // Return the user document
    return await this.user.toPromise();
  }

  /**
   * Sign the user in with Google's OIDC.
   */
  async signInWithGoogle(): Promise<void> {
    // Call the sign in with OIDC method using google.com
    return await this.signInWithOidc('google.com');
  }

  /**
   * Sign the user in with Apple's OIDC.
   */
  async signInWithApple(): Promise<void> {
    // Call the sign in with OIDC method using apple.com
    return await this.signInWithOidc('apple.com');
  }

  /**
   * Sign out the user.
   */
  async signOut(): Promise<void> {
    // Call the sign out method
    await this.afAuth.signOut();

    // Navigate back to the home page
    await this.router.navigate(['/']);
    return;
  }

  /**
   * Sign in using OpenID Connect
   * @param string the name of the OIDC provider
   */
  private async signInWithOidc(
    providerId: 'google.com' | 'apple.com'
  ): Promise<void> {
    // Create the provider
    const provider = new firebase.auth.OAuthProvider(providerId);

    // Add the profile scope so we can get their picture
    provider.addScope('profile');

    // Get the credentials from the user
    const credential = await this.afAuth.signInWithPopup(provider);

    // Update the user's details in the database if they have changed
    return this.updateUserDetails(credential.user);
  }

  /**
   * Update the details of the user if they have changed.
   * @param user the Firebase user object
   */
  private async updateUserDetails(user: firebase.User): Promise<void> {
    // Create the document reference
    const userRef = this.afs.doc<User>(`/users/${user.uid}`);

    // Try fetch the user document
    try {
      var userDoc = await userRef.get().toPromise();
    } catch (err) {
      throw err;
    }

    // Check if it exists, otherwise we can let the backend handle creation
    if (userDoc.exists) {
      // We can update it
      var data = userDoc.data();

      // Update the details
      data.email = user.email;
      data.imageUrl = user.photoURL;
      data.name = user.displayName;

      // We can now update/add the document
      try {
        return await userRef.set(data, { merge: true });
      } catch (err) {
        throw err;
      }
    }
  }
}
