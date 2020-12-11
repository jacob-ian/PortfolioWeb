import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService implements OnDestroy {
  // The subscription to the token
  tokenSubscription: Subscription;

  constructor(private afm: AngularFireMessaging) {}

  /**
   * Request permissions and subscribe client to push notifications.
   * @returns void
   */
  subscribe(): void {
    // Call the token and permissions request
    this.tokenSubscription = this.afm.requestToken.subscribe(
      (token) => {
        console.log(`Send token to server: ${token}`);
      },
      (error) => {
        console.error(error);
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
