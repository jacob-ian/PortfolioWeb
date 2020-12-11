import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User, UserMetadata } from '@functions/users/users.models';

export { User, UserMetadata };

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // The user document observable
  user$: Observable<User>;

  // The subscription to the metadata document
  metaSubscription: Subscription;

  // The subscription to OAuth redirects
  redirectSubscription: Subscription;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    // Fetch the firestore document from the auth state and bind it to the user
    // observable
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // Check if the user is logged in
        if (user) {
          // Subscribe to changes in the metadata document
          this.metaSubscription = this.afs
            .doc<UserMetadata>(`/metadata/${user.uid}`)
            .valueChanges()
            .subscribe(() => {
              // Force the user's JWT to be refreshed on update
              user.getIdToken(true);
            });

          // Return the firestore document
          return this.afs.doc<User>(`/users/${user.uid}`).valueChanges();
        } else {
          // We aren't logged in, return null
          return of(null);
        }
      })
    );

    // Check the authstate for a signin redirect
    this.redirectSubscription = this.afAuth.authState.subscribe(async () => {
      // Get the redirect result
      try {
        var redirectResult = await this.afAuth.getRedirectResult();
      } catch (err) {
        // Get the error message and code
        const code = err.code;
        const message = err.message;

        // Redirect the user to the login page with errors
        return await this.router.navigate(['/login'], {
          queryParams: { error: code, error_description: message },
        });
      }

      // Check if this was a redirect
      if (redirectResult.user) {
        // Check if this is the first signup
        if (redirectResult.additionalUserInfo.isNewUser) {
          // We can redirect to the setup page
          return await this.router.navigate(['/register']);
        } else {
          // Update the user's details
          return this.updateUserDetails(redirectResult.user).then(() => {
            // Redirect to the dashboard
            return this.router.navigate(['/dashboard']);
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the user metadata
    if (this.metaSubscription) {
      this.metaSubscription.unsubscribe();
    }

    // Unsubscribe from the redirect service
    if (this.redirectSubscription) {
      this.redirectSubscription.unsubscribe();
    }
  }

  /**
   * Fetch the currently logged in user.
   */
  async getSignedInUser(): Promise<User> {
    // Return the user document
    return await this.user$.toPromise();
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
    return await this.afAuth.signInWithRedirect(provider);
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

    // Check if it exists, otherwise we can let the backend handle registration
    if (userDoc.exists) {
      // We can update it
      var data = userDoc.data();

      // Destructure the firebase user details
      const { email, photoURL, displayName } = user;

      // Check if there is an image provided
      if (photoURL) {
        // Update the image
        data.imageUrl = photoURL;
      }

      // Update the details
      data.email = email;
      data.name = displayName;

      // We can now update/add the document
      try {
        return await userRef.update(data);
      } catch (err) {
        throw err;
      }
    }
  }
}
