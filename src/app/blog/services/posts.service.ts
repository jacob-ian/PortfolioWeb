import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/auth.service';
import {
  BlogServiceError,
  Draft,
  Post,
  PostDeleted,
  PostRequest,
} from './blog.models';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private afs: AngularFirestore, private auth: AuthService) {}

  /**
   * Create the post ID for the blog post.
   * @returns the post ID as a string
   */
  createId(): string {
    // Return a new firestore ID
    return this.afs.createId();
  }

  /**
   * Fetches a post given its ID
   * @param postId the ID of the post
   * @returns a promise of a Post
   * @throws a BlogServiceError
   */
  async getPostById(postId: string): Promise<Post> {
    // Create the document ref
    const ref = this.afs.doc<Post>(`/posts/${postId}`);

    // Fetch the document
    try {
      var doc = await ref.get().toPromise();
    } catch (err) {
      throw err;
    }

    // Check that the document exists
    if (!doc.exists) {
      // Throw an error
      const err: BlogServiceError = {
        code: 404,
        error: 'not-found',
        description: "The requested post doesn't exist.",
      };
      throw err;
    }

    // Return the data
    return doc.data();
  }

  /**
   * Fetches a post given its name (url-safe)
   * @param name the url-safe name
   * @returns a promise to a Post
   * @throws a BlogServicError
   */
  async getPostByName(name: string): Promise<Post> {
    // Create the document ref
    const ref = this.afs
      .collection<Post>('posts')
      .ref.where('name', '==', name);

    // Fetch the document
    try {
      var docs = await ref.get();
    } catch (err) {
      throw err;
    }

    // Check if it exists
    if (docs.empty) {
      // Throw an error
      const err: BlogServiceError = {
        code: 404,
        error: 'not-found',
        description: "The requested post doesn't exist.",
      };
      throw err;
    }

    // Return the post
    return docs.docs[0].data();
  }

  /**
   * Create a post on the database
   * @param postRequest the request object containing the post data
   * @returns a promise to the completed Post
   * @throws a BlogServiceError
   */
  async create(postRequest: PostRequest): Promise<void> {
    return;
  }

  /**
   * Update a post on the database.
   * @param update the data to update on the post.
   * @returns a promise to the updated Post.
   * @throws a BlogServiceError
   */
  async update(update: Partial<Post>): Promise<void> {
    return;
  }

  /**
   * Deletes a post from the database
   * @param postId the ID of the post
   * @returns a promise to the ID of the deleted post
   * @throws a BlogServicError
   */
  async delete(postId: string): Promise<void> {
    return;
  }
}
