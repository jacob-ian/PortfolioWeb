import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
const firestore = firebase.firestore;
import { User, AuthService } from 'src/app/core/services/auth.service';
import {
  BlogServiceError,
  Draft,
  PostRequest,
} from '@functions/blog/blog.models';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DraftsService {
  // The list of drafts
  drafts$: Observable<Draft[]>;

  // The ID of the user
  private userId: string;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router
  ) {
    // Create the drafts list observable by fetching the user ID
    this.drafts$ = this.auth.user$.pipe(
      take(1),
      switchMap((user) => {
        // Check for a user
        if (user) {
          // Get the user id
          this.userId = user.uid;

          // Return the collection of drafts for that user
          return this.afs
            .collection<Draft>(`/users/${this.userId}/drafts`)
            .valueChanges();
        } else {
          // Send the user to the login page
          this.router.navigate(['/login']);
        }
      })
    );
  }

  /**
   * Save a draft to the database
   * @param draftRequest the incomplete post object
   * @returns a promise to a Draft
   * @throws a BlogServiceError
   */
  async create(draftRequest: Partial<PostRequest>): Promise<void> {
    // Get the signed in user
    try {
      var user = await this.auth.getSignedInUser();
    } catch (err) {
      throw err;
    }

    // Check that there is a signed in user
    if (!user) {
      // Send back an error
      const err: BlogServiceError = {
        code: 401,
        error: 'unauthenticated',
        message: 'You must be logged in to save a draft.',
      };
      throw err;
    }

    // Get the title and ID
    const { title, id } = draftRequest;

    // Make sure there is a title and an ID
    if (!(title && id)) {
      // Throw an error that the two are needed
      const err: BlogServiceError = {
        code: 400,
        error: 'invalid-request',
        message: 'A draft title and ID are required.',
      };
      throw err;
    }

    // Create the ref of the document
    const ref = this.afs.doc<Draft>(`/users/${user.uid}/drafts/${id}`);

    // Save the draft
    try {
      await ref.set({
        ...draftRequest,
        id,
        title,
        dateCreated: Date.now(),
      });
    } catch (err) {
      throw err;
    }

    // Update the number of drafts stored on the user's account
    try {
      await this.afs
        .doc<User>(`/users/${user.uid}`)
        .update({ draftCount: firebase.firestore.FieldValue.increment(1) });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Update a draft on the database
   * @param update
   */
  async update(update: Partial<Draft>): Promise<void> {
    // Get the user ID
    if (!this.userId) {
      // Fetch the user
      try {
        var user = await this.auth.getSignedInUser();
      } catch (err) {
        throw err;
      }

      // Check if there is a user
      if (!user) {
        // Throw an error
        const err: BlogServiceError = {
          code: 401,
          error: 'unauthenticated',
          message: 'You must be logged in to update a draft.',
        };
        throw err;
      }

      // Update the user Id
      this.userId = user.uid;
    }

    // Get the post Id
    const { id } = update;

    // Check for the id
    if (!id) {
      // Throw an error
      const err: BlogServiceError = {
        code: 400,
        error: 'invalid-request',
        message: 'The Draft ID is required.',
      };
      throw err;
    }

    // Update the post
    try {
      return await this.afs
        .doc<Draft>(`/users/${this.userId}/drafts/${id}`)
        .update({ ...update, dateUpdated: Date.now() });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Delete a draft from the user's collection
   * @param draftId the ID of the draft
   * @param movedToPosts whether or not the draft is being deleted because its now a post
   * @returns void
   */
  async delete(draftId: string, movedToPosts: boolean): Promise<void> {
    // Check if we have a userId
    if (!this.userId) {
      try {
        // Fetch the user
        var user = await this.auth.getSignedInUser();
      } catch (err) {
        throw err;
      }

      if (!user) {
        // Throw an error
        const err: BlogServiceError = {
          code: 401,
          error: 'unauthenticated',
          message: 'You must be logged in to delete a draft.',
        };
        throw err;
      }

      // Set the userId
      this.userId = user.uid;
    }

    // Delete the draft from the collection
    return this.afs
      .doc<Draft>(`/users/${this.userId}/drafts/${draftId}`)
      .delete()
      .then(async () => {
        // Reduce the number of drafts on the user document
        try {
          return await this.afs
            .doc<User>(`/users/${this.userId}`)
            .update({ draftCount: firestore.FieldValue.increment(-1) });
        } catch (err) {
          throw err;
        }
      })
      .catch((err) => {
        throw err;
      });
  }
}
