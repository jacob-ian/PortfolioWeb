import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/core/core.models';
import { BlogServiceError, Draft, PostRequest } from './blog.models';

@Injectable({
  providedIn: 'root',
})
export class DraftsService {
  constructor(private afs: AngularFirestore, private auth: AuthService) {}

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
        description: 'You must be logged in to save a draft.',
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
        description: 'A draft title and ID are required.',
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
    return;
  }

  async delete(draftId: string): Promise<void> {}
}
