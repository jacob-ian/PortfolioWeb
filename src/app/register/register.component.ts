import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { User } from '../core/core.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  // The registration form
  registerForm = this.fb.group({
    emailSubscribe: [true, Validators.required],
    notificationsSubscribe: [true, Validators.required],
  });

  // The error object
  @Input() error: string;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private afs: AngularFirestore
  ) {}

  ngOnInit(): void {}

  /**
   * Registers a user with their notification preferences
   */
  async register(): Promise<boolean> {
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
      // Add the user to the email list
      await this.afs.doc(`/emails/${email}`).set({ email });
    }

    // Check if the user wants to subscribe to push notifications
    if (notificationsSubscribe) {
    }

    // Update the user document
    return this.afs
      .doc<User>(`/users/${uid}`)
      .update({
        notifications: { email: emailSubscribe, push: notificationsSubscribe },
      })
      .then(() => {
        // Redirect the user back to the homepage
        return this.router.navigate(['/']);
      });
  }
}
