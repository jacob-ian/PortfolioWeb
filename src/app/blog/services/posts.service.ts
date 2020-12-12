import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
const firestore = firebase.firestore;
import { AuthService, User } from 'src/app/core/services/auth.service';
import {
  Author,
  BlogServiceError,
  Post,
  PostRequest,
} from '@functions/blog/blog.models';

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
        message: "The requested post doesn't exist.",
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
        message: "The requested post doesn't exist.",
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
    // Get the signed in user
    try {
      var user = await this.auth.getSignedInUser();
    } catch (err) {
      // Rethrow the error
      throw err;
    }

    // Check that a user is signed in
    if (!user) {
      // Throw an error
      const error: BlogServiceError = {
        code: 401,
        error: 'unauthenticated',
        message: 'You must be logged in to post.',
      };
      throw error;
    }

    // Get the user Id
    const { uid } = user;

    // Create the author object
    const author: Author = {
      uid: user.uid,
      name: user.name,
      image: {
        href: user.imageUrl,
      },
    };

    // Get the ID and title from the request
    const { id, name } = postRequest;

    // Check that the name is valid
    if (!(await this.checkName(name))) {
      // Throw an error that the input is invalid
      const err: BlogServiceError = {
        code: 400,
        error: 'invalid-request',
        message: 'The blog post URL name is already taken. Please try another.',
      };
      throw err;
    }

    // Create the HREF of the post
    const href = `https://jacobianmatthews.com/blog/${name}`;

    // Create the document reference
    const ref = this.afs.doc<Post>(`/posts/${id}`);

    // Add the document to the collection
    ref
      .set({
        ...postRequest,
        author,
        dateCreated: Date.now(),
        commentCount: 0,
        href,
      })
      .then(async () => {
        // Add the post ID to the user's document
        try {
          return await this.afs
            .doc<User>(`/users/${uid}`)
            .update({ posts: firestore.FieldValue.arrayUnion([id]) });
        } catch (err) {
          // throw the error
          throw err;
        }
      })
      .catch((err) => {
        // rethrow the error
        throw err;
      });
  }

  /**
   * Update a post on the database.
   * @param update the data to update on the post.
   * @returns a promise to the updated Post.
   * @throws a BlogServiceError
   */
  async update(update: Partial<Post>): Promise<void> {
    // Get the signed in user
    try {
      var user = await this.auth.getSignedInUser();
    } catch (err) {
      throw err;
    }

    // Make sure the user exists
    if (!user) {
      // Throw an error
      const err: BlogServiceError = {
        code: 401,
        error: 'unauthenticated',
        message: 'You must be logged in to edit posts.',
      };
      throw err;
    }

    // Get the post id
    const { id } = update;

    // Make sure the ID exists
    if (!id) {
      // Return an error
      const err: BlogServiceError = {
        code: 400,
        error: 'invalid-request',
        message: 'The Post ID is required to update a post.',
      };
      throw err;
    }

    // Try to update the document
    try {
      return await this.afs
        .doc<Post>(`/posts/${id}`)
        .update({ ...update, dateUpdated: Date.now() });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Deletes a post from the database
   * @param postId the ID of the post
   * @returns a promise to the ID of the deleted post
   * @throws a BlogServicError
   */
  async delete(postId: string): Promise<void> {
    // Get the signed-in user
    try {
      var user = await this.auth.getSignedInUser();
    } catch (err) {
      // Throw an error
      throw err;
    }

    // Check the user exists
    if (!user) {
      // Throw an error
      const err: BlogServiceError = {
        code: 401,
        error: 'unauthenticated',
        message: 'You must be logged in to delete posts.',
      };
      throw err;
    }

    // Get the userId
    const { uid } = user;

    // Try delete the post with the given ID
    this.afs
      .doc(`/posts/${postId}`)
      .delete()
      .then(async () => {
        // Remove the post ID from the user's document
        try {
          return await this.afs
            .doc(`/users/${uid}`)
            .update({ posts: firestore.FieldValue.arrayRemove([postId]) });
        } catch (err) {
          throw err;
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  /**
   * Create the url-safe name of the blog post from the title
   * @param title the title of the post
   * @returns a string with the url-safe name that was created (not guaranteed to be available)
   */
  createName(title: string): string {
    // Remove the url-unsafe characters and replace with hyphens
    return title
      .split(' ')
      .map((set) => set.match(/[0-9a-zA-Z]/g).join(''))
      .join('-');
  }

  /**
   * Check the url-safe name of a post
   * @param name the url-safe name
   * @returns true if the name is available
   */
  async checkName(name: string): Promise<boolean> {
    // Check the url-safe name against the database to make sure it isn't taken
    // Search the database by name
    try {
      var docs = await this.afs
        .collection('posts')
        .ref.where('name', '==', name)
        .get();
    } catch (err) {
      throw err;
    }

    // Return true if the docs list was empty
    return !docs.empty;
  }
}
