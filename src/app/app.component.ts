import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationsService } from './core/notifications/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  // The App title
  title = 'Jacob Ian Matthews';

  // The notification message subscription
  messageSubscription: Subscription;

  constructor(private notifications: NotificationsService) {}

  ngOnInit(): void {
    // Check that the app is in production and not development
    if (environment.production) {
      // Listen for messages
      this.messageSubscription = this.notifications.listen();
    }

    // Set the vh measure
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // Listen to the window resize event and update the vh style
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the message service
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
