import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { User } from '@functions/users/users.models';
import { Observable, Subscription } from 'rxjs';
import { first, switchMap, take, tap } from 'rxjs/operators';
import { NotificationsService } from '../core/notifications/notifications.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  // The registration form
  registerForm = this.fb.group({
    emailSubscribe: [true, Validators.required],
    notificationsSubscribe: [true, Validators.required],
  });

  // The subscription to the registered state
  registeredSub: Subscription;

  // The user observable
  user$: Observable<User>;

  // The error object
  @Input() error: string;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private notifications: NotificationsService
  ) {}

  ngOnInit(): void {
    // Get the user observable
    this.user$ = this.auth.user$;
  }

  /**
   * Registers a user with their notification preferences
   */
  async register(): Promise<void> {
    // Get the form data
    const data = this.registerForm.value;

    // Destructure the data
    const { emailSubscribe, notificationsSubscribe } = data;

    // Get the user details
    try {
      var { uid, email } = await this.auth.getSignedInUser();
    } catch (err) {
      // Set the error message
      this.error = err;
    }

    // Check if the user wants to subscribe to emails
    if (emailSubscribe) {
      try {
        // Add the user to the email list
        await this.afs.doc(`/emails/${email}`).set({ email });
      } catch (err) {
        // Set the error message
        this.error = err.message;
        return;
      }
    }

    // Check if the user wants to subscribe to push notifications
    if (notificationsSubscribe) {
      // Call the push notifications service worker
      try {
        await this.notifications.subscribe();
      } catch (err) {
        // Set the error message
        this.error = err.message;
        return;
      }
    }

    // Update the user document
    return this.afs
      .doc<User>(`/users/${uid}`)
      .update({
        notifications: { email: emailSubscribe },
      })
      .then(async () => {
        // Fetch the query parameters for the page
        const params = await this.route.queryParams.pipe(first()).toPromise();

        // Check for redirect instructions
        if (params.redirect_path) {
          // Redirect to the path
          this.router.navigate([params.redirect_path]);
          return;
        } else {
          this.router.navigate(['/dashboard']);
        }
      })
      .catch((err) => {
        // Set the error
        this.error = err.message;
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscriptions
    if (this.registeredSub) {
      this.registeredSub.unsubscribe();
    }
  }
}
