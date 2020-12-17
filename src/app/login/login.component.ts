import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // The error message
  @Input() error: string;

  // A disable boolean
  @Input() disable: boolean = false;

  // A loading boolean
  @Input() loading: boolean = false;

  // The subscription to the query parameters
  paramSubscription: Subscription;

  // The subscription to the user observable
  userSubscription: Subscription;

  // Create a timeout ID
  timeout: any;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    // Check if there are any query parameters
    this.paramSubscription = this.route.queryParams.subscribe((params) => {
      // Check for an active signin method
      if (params.method) {
        // Set the loading boolean if there aren't any errors in the query
        this.loading = true;

        // Create a timeout
        this.timeout = setTimeout(async () => {
          // Redirect back to the login page due to timeout
          this.router.navigate([], {
            queryParams: {
              ...(await this.route.queryParams.pipe(first()).toPromise()),
              method: undefined,
            },
          });
        }, 10000);
      } else {
        this.loading = false;
      }

      // Check for an error
      if (params.error || params.error_description) {
        // Stop the loading
        this.loading = false;

        // Get the error message and display it
        this.error = params.error_description;
      } else {
        this.error = null;
      }
    });

    // Check if the user is already logged in
    this.userSubscription = this.auth.user$.pipe(first()).subscribe(
      async (user) => {
        // Check if there is a signed in user
        if (user) {
          // Get the query parameters
          const queryParams = await this.route.queryParams
            .pipe(first())
            .toPromise();

          // Check for the new user boolean
          if (!user.isRegistered) {
            // Redirect to the register page
            return this.router.navigate(['/register'], {
              queryParams: {
                ...queryParams,
                error: undefined, // remove the error from the query
                error_description: undefined,
              },
            });
          } else {
            // The user isn't new, we can redirect them where they need to go
            // Check if there are any redirect instructions
            const { redirect_path } = queryParams;

            if (redirect_path) {
              // Redirect the user back to the requested path
              return this.router.navigate([redirect_path]);
            } else {
              // Redirect the user to the dashboard
              return this.router.navigate(['/dashboard']);
            }
          }
        }
      },
      async (error) => {
        // We can send the error to the login screen
        // Get the error message
        const code = error.code;
        const message = error.message;

        // Cancel any timeouts
        if (this.timeout) {
          clearTimeout(this.timeout);
        }

        // Fetch the current query parameters
        this.route.queryParams
          .pipe(first())
          .toPromise()
          .then((params) => {
            // Route to the error
            return this.router.navigate([], {
              queryParams: {
                ...params,
                error: code,
                error_description: message,
              },
            });
          });
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }

  /**
   * Called on the sign in button-press
   * @param event the event produced by the button
   * @returns void
   */
  async signIn(event: any): Promise<void> {
    // Get the value of the submitter
    const value = event.target.value;

    // Clear the error
    this.error = null;

    // Set the disable boolean to true
    this.disable = true;

    // Get the query params
    const queryParams = await this.route.queryParams.pipe(first()).toPromise();

    // Pause all subscriptions
    this.userSubscription.unsubscribe();
    this.paramSubscription.unsubscribe();

    // Call the correct function
    switch (value) {
      case 'google':
        // Sign in with Google
        try {
          return await this.auth.signInWithGoogle();
        } catch (err) {
          // Re-enable the button
          this.disable = false;

          // Navigate to the error
          this.router.navigate([], {
            queryParams: {
              ...queryParams,
              error: err.code,
              error_description: err.message,
            },
          });
        }
      case 'apple':
        // Sign in with Apple
        try {
          return await this.auth.signInWithApple();
        } catch (err) {
          // Re-enable the button
          this.disable = false;

          // Navigate to the error
          this.router.navigate([], {
            queryParams: {
              ...queryParams,
              error: err.code,
              error_description: err.message,
            },
          });
        }
    }
  }
}
