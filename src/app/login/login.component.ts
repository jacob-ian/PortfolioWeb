import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/auth.service';

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

  // The subscription to the query parameters
  paramSubscription: Subscription;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    // Check if the user is already logged in
    if (await this.auth.user$.toPromise()) {
      // Navigate to the dashboard
      this.router.navigate(['/dashboard']);
    }

    // Check if there are any query parameters
    this.paramSubscription = this.route.params.subscribe((params) => {
      // Check for an error
      if (params.error) {
        // Get the error message and display it
        this.error = params.error_description;
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.paramSubscription) {
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

    // Call the correct function
    switch (value) {
      case 'google':
        // Sign in with Google
        try {
          return await this.auth.signInWithGoogle();
        } catch (err) {
          // Re-enable the button
          this.disable = false;

          // Display the error
          this.error = err.message;
        }
      case 'apple':
        // Sign in with Apple
        try {
          return await this.auth.signInWithApple();
        } catch (err) {
          // Re-enable the button
          this.disable = false;

          // Display the error
          this.error = err.message;
        }
    }
  }
}
