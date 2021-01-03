import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { User } from '@functions/users/users.models';
import { Observable, Subscription } from 'rxjs';
import { finalize, first, switchMap, take, tap } from 'rxjs/operators';
import { NotificationsService } from '../core/notifications/notifications.service';
import { ImageService } from '../core/services/image.service';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { DialogService } from '../core/dialog/dialog.service';
import { TermsConditionsComponent } from '../terms-conditions/terms-conditions.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  // The registration form
  registerForm = this.fb.group({
    imageUrl: ['', [Validators.required]],
    emailSubscribe: [true, Validators.required],
    pushNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  // The subscription to the registered state
  registeredSub: Subscription;

  // The user observable
  user$: Observable<User>;

  // The user's Id
  userId: string;

  // The error object
  @Input() error: string;

  // The image percentage upload
  @Input() imagePercentage: Observable<number>;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private notifications: NotificationsService,
    private images: ImageService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    // Get the user observable
    this.user$ = this.auth.user$.pipe(
      tap((user) => {
        // Grab the user ID
        this.userId = user.uid;

        // Check for an image URL
        if (user.imageUrl) {
          // Update the form with the image URL
          this.registerForm.controls['imageUrl'].setValue(user.imageUrl);
        }

        return user;
      })
    );
  }

  /**
   * Update the user image.
   * @returns void
   */
  async editImage(): Promise<void> {
    // Create the image dialog
    const res = this.images.createDialog(`/users/${this.userId}/images`, {
      ratio: '1:1',
    });

    // Get the file reference
    const ref = (await res).ref;

    // Set the percentage observable
    this.imagePercentage = res.percentageChanges();

    // Subscribe to the snapshot changes
    const sub = res
      .snapshotChanges()
      .pipe(
        finalize(async () => {
          // Set the download URL
          this.registerForm.setValue({
            userImage: {
              imageUrl: await ref.getDownloadURL(),
            },
          });
        })
      )
      .subscribe(
        () => {},
        (error) => {
          // Get the error
          this.error = error.message;
        },
        () => {
          // Unsubscribe
          sub.unsubscribe();
        }
      );
  }

  /**
   * Show the terms and conditions dialog.
   * @returns void
   */
  showTerms(): void {
    return this.dialogService.create({
      component: TermsConditionsComponent,
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
        isRegistered: true,
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
