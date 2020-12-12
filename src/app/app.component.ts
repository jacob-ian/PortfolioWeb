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
  }

  ngOnDestroy(): void {
    // Unsubscribe from the message service
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
