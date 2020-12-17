import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { User } from '@functions/users/users.models';
import { Observable, Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
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

  // The subscription to the route's query params
  querySub: Subscription;
  registeredSub: Subscription;

  // The redirect address
  redirectPath: string;
  redirectParams: any;

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
    // Get the query params to check for a uid
    this.querySub = this.route.queryParams.subscribe((params) => {
      // Check if the uid param exists
      if (!params.uid) {
        // We can redirect back to the login page
        return this.router.navigate(['/login']);
      }

      // Check if there is a redirect path or params
      this.redirectPath = params.redirect_path
        ? params.redirect_path
        : undefined;
      this.redirectParams = params.redirect_params
        ? params.redirect_params
        : undefined;
    });

    // Get the user observable
    this.user$ = this.auth.user$;

    // Create the subscription to the user to check if registration is required
    this.registeredSub = this.user$.pipe(take(1)).subscribe((user) => {
      // Check if there is a user
      if (user) {
        // Check if the user has the is registered boolean
        // TODO: Remove the comment (commented for development)
        /**
         * if (user.isRegistered) {
          // We can redirect the user away from here
          this.redirectUser();
        }
         */
      }
    });
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
      .then(() => {
        // Redirect the user back to the homepage
        return this.redirectUser();
      })
      .catch((err) => {
        // Set the error
        this.error = err.message;
      });
  }

  /**
   * Redirects the user either to the dashboard or to the previous page they were on.
   * @returns void
   */
  redirectUser(): void {
    // Check if there is a redirect path
    if (this.redirectPath) {
      // Check for params
      if (this.redirectParams) {
        // Redirect to the address with the params
        this.router.navigate([this.redirectPath], {
          queryParams: this.redirectParams,
        });
      } else {
        // Redirect to the address without params
        this.router.navigate([this.redirectPath]);
      }
    } else {
      // Redirect the user to the dashboard
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnDestroy(): void {
    // Check for the query subscription and unsubscribe
    if (this.querySub) {
      this.querySub.unsubscribe();
    }

    if (this.registeredSub) {
      this.registeredSub.unsubscribe();
    }
  }
}
