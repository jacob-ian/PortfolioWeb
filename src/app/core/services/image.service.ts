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

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private storage: AngularFireStorage, private auth: AuthService) {}

  /**
   * Create an image uploading dialog
   * @param uploadPath the path to upload the image to
   * @param dimensions the dimensions required of the image
   * @returns void
   */
  createDialog(
    uploadPath: string,
    dimensions: { ratio: '1:1' }
  ): AngularFireUploadTask {
    return null;
  }

  /**
   * Upload an image to the Firebase Storage Bucket.
   * @param event the form submission event
   * @returns an upload task for tracking upload percentage
   * @throws ImageServiceError
   */
  async uploadImage(event: any): Promise<AngularFireUploadTask> {
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

    // Get the file from the event
    const file = event.target.files[0];

    // Get the file name
    const fileName = file.name;

    // Create the filepath
    const filePath = `/users/${userId}/images/${fileName}`;

    // Create the file reference
    const ref = this.storage.ref(filePath);

    // Start the upload task
    const task = ref.put(file);

    // Return the upload task
    return task;
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
