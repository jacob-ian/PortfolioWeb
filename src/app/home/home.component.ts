import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../core/notifications/notifications.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  constructor(
    private auth: AuthService,
    public notifications: NotificationsService
  ) {}

  ngOnInit(): void {}

  testNotification() {
    // Create a test notification
    this.notifications.createNotification({
      notification: {
        title: 'Test Notification',
        body: 'This is a big ole test notification with some random content.',
        icon: '/assets/icons/icon-512x512.png',
      },
      data: {
        routerLink: '/blog',
      },
    });
  }

  async signOut(): Promise<void> {
    return await this.auth.signOut();
  }
}
