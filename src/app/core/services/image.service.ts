import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { AuthService } from './auth.service';
import {
  ImageServiceError,
  ImageUploadTask,
} from '@functions/images/images.models';
import { DialogService } from '../dialog/dialog.service';
import { DialogAction, DialogOptions } from '@functions/misc/services.models';
import { ImageDialogComponent } from '../dialog/image-dialog/image-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(
    private storage: AngularFireStorage,
    private auth: AuthService,
    private dialogService: DialogService
  ) {}

  /**
   * Create an image uploading dialog.
   * @param action the action button of the dialog
   * @param uploadPath the path to upload the image to
   * @param dimensions the dimensions required of the image
   * @returns void
   */
  createDialog(action: DialogAction, uploadPath: string): void {
    // Create the uploading dialog
    return this.dialogService.create({
      action,
      component: ImageDialogComponent,
    });
  }

  /**
   * Upload a profile image to the Firebase Storage Bucket.
   * @param base64 the base64 image string
   * @param filename the name of the image
   * @returns an upload task for tracking upload percentage
   * @throws ImageServiceError
   */
  async uploadProfileImage(
    base64: string,
    filename: string
  ): Promise<AngularFireUploadTask> {
    // Get the current user
    try {
      var user = await this.auth.getSignedInUser();
    } catch (err) {
      // Rethrow the error
      throw err;
    }

    // If the user is undefined, stop the process
    if (!user) {
      const err: ImageServiceError = {
        code: 401,
        error: 'unauthenticated',
        description: 'You must be logged in to upload images.',
      };
      throw err;
    }

    // Get the user ID
    const userId = user.uid;

    // Create the file reference
    const ref = this.storage.ref(`/users/${userId}/images/${filename}`);

    // Start the upload task
    const task = ref.putString(base64, 'base64', { contentType: 'image/png' });

    return { ...task };
  }

  /**
   * Upload an image for a blog post
   * @param event the form event
   * @param postId the ID of the post as a string
   * @returns an AngularFireUploadTask
   */
  uploadBlogPostImage(event: any, postId: string): AngularFireUploadTask {
    // Get the file
    const file = event.target.files[0];

    // Get the filename
    const filename = file.name;

    // Get the reference
    const ref = this.storage.ref(`posts/${postId}/images/${filename}`);

    // Get the task
    const task = ref.put(file);

    // Return the task
    return task;
  }

  async editBlogPostImage() {}

  /**
   * Deletes a blog post image
   * @param postId the ID of the post
   * @param fileName the name of the file
   */
  async deleteBlogPostImage(
    fileName: string,
    postId: string
  ): Promise<boolean> {
    // Create the ref
    const ref = this.storage.ref(`posts/${postId}/images/${fileName}`);

    // Delete the image
    return ref
      .delete()
      .toPromise()
      .then(() => {
        // Return true since it worked
        return true;
      })
      .catch((err) => {
        // throw the error
        throw err;
      });
  }
}
