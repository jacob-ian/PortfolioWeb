import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmailService } from '../core/email.service';
import { MetaService } from '../core/meta.service';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.sass'],
})
export class UnsubscribeComponent implements OnInit, OnDestroy {
  // The subscription to the parameters
  paramSub: Subscription;

  // Set a loading state
  @Input() loading: boolean = true;

  // Set a completion state
  @Input() success: boolean = false;

  // Create an error message
  @Input() error: string;

  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    // Fetch the query parameters
    this.paramSub = this.route.queryParamMap.subscribe(async (params) => {
      // Get the UID of the email
      const uid = params.get('uid');

      // Check if the uid exists
      if (uid) {
        try {
          // Attempt to delete the uid
          await this.emailService.removeEmail(uid);

          // Set the success state to true and the loading state to false
          this.loading = false;
          this.success = true;
          return;
        } catch (err) {
          // Set loading to false and the error to the message
          this.loading = false;
          this.error = err.message;
        }
      } else {
        // Create an error
        this.error =
          'The unsubscribe URL address is invalid. <br />Please try again or ask support to remove your email at: <a class="error-link" href="mailto:support@jacobianmatthews.com">support@jacobianmatthews.com</a>.';
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
  }
}
