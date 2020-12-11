import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService implements OnDestroy {
  // The subscription to the token
  tokenSubscription: Subscription;

  constructor(
    private afm: AngularFireMessaging,
    private aff: AngularFireFunctions
  ) {}

  /**
   * Request permissions and subscribe client to push notifications.
   * @returns void
   */
  async subscribe(): Promise<void> {
    // Call the token and permissions request
    this.tokenSubscription = this.afm.requestToken.subscribe(
      async (token) => {
        // Register the token with a firebase function
        const fn = this.aff.httpsCallable('registerToken');
        try {
          return await fn({ token }).toPromise();
        } catch (err) {
          throw err;
        }
      },
      (error) => {
        throw error;
      }
    );
  }

  ngOnDestroy(): void {
    // Check if there is a subscription to be unsubscribed from
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
  }
}
