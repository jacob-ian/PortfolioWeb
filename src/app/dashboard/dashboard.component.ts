import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService, User } from '../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  // The user observable
  user$: Observable<User>;

  // The user subscription
  userSub: Subscription;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Get the user observable
    this.user$ = this.auth.user$;

    // Subscribe to the user observable
    this.userSub = this.user$.pipe(take(1)).subscribe((user) => {
      // Check for a user
      if (user) {
        // Check if the user has been registerd
        if (!user.isRegistered) {
          // Send the user to the registration page
          return this.router.navigate(['/register'], {
            queryParams: { uid: user.uid },
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the user
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
