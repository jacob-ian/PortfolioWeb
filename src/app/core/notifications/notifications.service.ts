import {
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injectable,
  Injector,
  OnDestroy,
} from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Subscription } from 'rxjs';
import { NotificationsComponent } from './notifications.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService implements OnDestroy {
  // The subscription to the token
  tokenSubscription: Subscription;

  // The notifiation timeout
  timeout: any;

  constructor(
    private afm: AngularFireMessaging,
    private aff: AngularFireFunctions,
    private componentFactorResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  /**
   * Subscribe to listen to incoming foreground messages.
   * @returns a subscription
   */
  listen(): Subscription {
    // Subscribe to the foreground messages
    return this.afm.messages.subscribe((message: any) => {
      // Create the notification
      this.createNotification(message);
    });
  }

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

  /**
   * Creates a notification on the DOM
   * @param message the Firebase Cloud Message
   * @returns void
   */
  createNotification(message: any): void {
    // Play the notification sound
    const sound = new Audio('/assets/audio/notify.mp3');
    sound.play();

    // Set a timeout so that the sound can play as the notification arrives
    setTimeout(() => {
      // Get the message contents
      const { title, body, icon } = message.notification;

      // Get the router link from the data payload
      const { routerLink } = message.data;

      // Create the component ref
      const componentRef = this.componentFactorResolver
        .resolveComponentFactory(NotificationsComponent)
        .create(this.injector);

      // Add the inputs to the component
      componentRef.instance.init(title, body, icon, routerLink);

      // Attach the component to the application reference
      this.appRef.attachView(componentRef.hostView);

      // Get the DOM elements from the component
      const domElements = (componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

      // Append the HTML elements to the DOM body
      document.body.appendChild(domElements);

      // Bind to the close event input
      componentRef.instance.close.subscribe((event) => {
        // Make sure the close boolean is true
        if (event === true) {
          // Clear the timeout to not have any issues
          if (this.timeout) {
            clearTimeout(this.timeout);
          }

          // Destroy the notification
          // Remove the notification from the App
          this.appRef.detachView(componentRef.hostView);
          componentRef.destroy();
        }
      });

      // Create a timeout ID for removing the notification from the dom
      // Set the timeout to 5 seconds
      this.timeout = setTimeout(() => {
        // Call the close method on the component
        componentRef.instance.closeNotification(true);
      }, 5000);
    }, 200);
  }

  ngOnDestroy(): void {
    // Check if there is a subscription to be unsubscribed from
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
  }
}
