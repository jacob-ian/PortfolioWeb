import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

/**
 * An interface for the Author of a post
 */
interface Author {
  uid: string; // the UID of the post's author
  name: string; // the name of the author
  image: {
    href: string; // the location of the author's image
  };
}

export interface Comment {
  id: string; // the ID of the comment
  content: string; // the content of the comment
  author: Author; // the author of the comment
  dateCreated: number; // The date/time of creation
}

interface NewComment {
  content: string; // the content of the comment
  postId: string; // the id of the post to comment on
}

interface DeletedComment {
  id: string; // the ID of the comment that was deleted
  message: string; // the confirmation message
}

/**
 * An interface for a Blog Post object
 */
export interface Post {
  id: string; // the ID of the post
  title: string; // the post's title
  name: string; // the relative URL of the post (url-safe name)
  href: string; // the URL of the blog post
  thumbnail: {
    type: 'image/jpeg' | 'image/gif' | 'image/png' | 'image/svg'; // the image type of the thumbnail
    href: string; // the URL to the thumbnail image
  };
  // the author of the post
  author: Author;
  description: string; // the description of the blog post
  content: string; // the Markdown string content
  tags: string[]; // the tags associated with the post
  dateCreated: number; // the created date and time
  dateUpdated?: number; // the date of last edit
  comments: Comment[];
}

/**
 * An object with data for a new post to be created.
 */
interface PostRequest {
  title: string; // the name of the post
  description: string; // the description for the post
  content: string; // the Markdown/HTML content for the post
  tags: string[]; // the tags associated with the post
  thumbnail: {
    type: 'image/jpeg' | 'image/gif' | 'image/png' | 'image/svg';
    href: string; // the URL to the thumbnail image
  };
}

interface PostUpdate {
  id: string; // the ID of the post
  title?: string; // the name of the post
  name?: string; // the relative URL of the post (url-safe name)
  description?: string; // the description for the post
  content?: string; // the Markdown/HTML content for the post
  tags?: string[]; // the tags associated with the post
  thumbnail?: {
    type: 'image/jpeg' | 'image/gif' | 'image/png' | 'image/svg';
    href: string; // the URL to the thumbnail image
  };
  author?: Author;
}

interface PostDeleted {
  id: string; // the ID of the deleted post
  message: string; // the message confirming deletion
}

/**
 * An interface to handle the Blog Service's errors
 */
export interface BlogServiceError {
  code: number; // the HTTP code
  error:
    | 'not-found'
    | 'access-denied'
    | 'internal'
    | 'invalid-request'
    | 'unauthenticated'; // the name of the error
  description: string; // the human-readable description of the error
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  // The Firestore collection
  private collection: AngularFirestoreCollection<Post>;

  // The Posts list object
  posts$: Observable<Post[]>;

  // Create the filter objects
  limitFilter$: BehaviorSubject<number | null>;
  offsetFilter$: BehaviorSubject<number | null>;
  queryFilter$: BehaviorSubject<string | null>;
  tagsFilter$: BehaviorSubject<string[] | null>;
  orderByFilter$: BehaviorSubject<'dateCreated' | 'dateUpdated' | 'title'>;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    // Define the collection
    this.collection = this.afs.collection('posts');

    // Define the filters
    this.limitFilter$ = new BehaviorSubject(null);
    this.offsetFilter$ = new BehaviorSubject(null);
    this.tagsFilter$ = new BehaviorSubject(null);
    this.orderByFilter$ = new BehaviorSubject('dateCreated');
    this.queryFilter$ = new BehaviorSubject(null);

    // Get the posts collection observable by combining the filters
    this.posts$ = combineLatest([
      this.limitFilter$,
      this.offsetFilter$,
      this.tagsFilter$,
      this.orderByFilter$,
      this.queryFilter$,
    ]).pipe(
      switchMap(([limit, offset, tags, orderBy, querySearch]) =>
        this.afs
          .collection<Post>('posts', (ref) => {
            let query:
              | firebase.firestore.CollectionReference
              | firebase.firestore.Query = ref;
            if (limit) {
              query.limit(limit);
            }
            if (offset) {
              query.startAt(offset);
            }
            if (tags) {
              query.where('tags', 'array-contains', tags);
            }
            if (orderBy) {
              query.orderBy(orderBy);
            }
            if (querySearch) {
              query.where('title', 'in', querySearch);
            }
            return query;
          })
          .valueChanges()
      )
    );
  }

  /**
   *
   * BLOG POSTS
   *
   */

  /**
   * Fetches a Blog Post object by URL name
   * @param name the URL-safe name of the post
   * @returns the Post object
   * @throws BlogServiceError object
   */
  async getPostByName(name: string): Promise<Post> {
    // Call firestore to fetch the post that has the matching name
    try {
      var docs = await this.collection.ref.where('name', '==', name).get();
    } catch (err) {
      // Rethrow the error
      throw err;
    }

    // Check if a document was returned
    if (docs.empty) {
      // Throw an error
      const error: BlogServiceError = {
        code: 404,
        error: 'not-found',
        description: "The requested blog post doesn't exist.",
      };
      throw error;
    }

    // Return the post's data
    return docs.docs[0].data();
  }

  /**
   * Fetches a post given its ID
   * @param id the ID of the post to fetch
   * @returns a promise to a Post object
   * @throws BlogService Error
   */
  async getPostById(id: string): Promise<Post> {
    // Get the post by ID from Firestore
    try {
      var doc = await this.afs.doc<Post>(`/posts/${id}`).get().toPromise();
    } catch (err) {
      // Rethrow the error
      throw err;
    }

    // Check if a document was returned
    if (doc.exists) {
      // Throw an error
      const error: BlogServiceError = {
        code: 404,
        error: 'not-found',
        description: "The requested blog post doesn't exist.",
      };
      throw error;
    }

    // We can return the document
    return doc.data();
  }

  /**
   * Fetches an array of blog posts up to [limit] starting from [offset]
   * @param limit the number of posts to fetch
   * @param offset the post number to start fetching from (for pagination)
   * @param tags the post's tags to search by
   * @param orderBy the sort by method, default 'new': new first, 'old': old first
   * @param query a search query to filter the posts titles with
   * @returns an array of Post objects
   * @throws BlogServiceError object
   */
  getPosts(
    limit: number,
    orderBy: 'dateCreated' | 'dateUpdated' | 'title',
    offset?: number,
    tags?: string[],
    query?: string
  ): Observable<Post[]> {
    // Update the filters if they exist
    if (limit) {
      this.limitFilter$.next(limit);
    }
    if (orderBy) {
      this.orderByFilter$.next(orderBy);
    }
    if (offset) {
      this.offsetFilter$.next(offset);
    }
    if (tags) {
      this.tagsFilter$.next(tags);
    }
    if (query) {
      this.queryFilter$.next(query);
    }

    // Return the posts observable
    return this.posts$;
  }

  /**
   * Creates a new blog post in the database
   * @param post a PostRequest object
   * @returns a promise of a Post object with the finalised details
   * @throws BlogServiceError object
   */
  async createPost(post: PostRequest): Promise<Post> {
    // Get the current user
    const user = await this.auth.getSignedInUser();

    // Check that the user exists
    if (!user) {
      // Throw an error of unauthenticated
      const err: BlogServiceError = {
        code: 401,
        error: 'unauthenticated',
        description: 'You must be logged in to make a blog post.',
      };
      throw err;
    }

    // Destructure the data
    var { title, description, thumbnail, tags, content } = post;

    // Get the display name and their photo URL
    const author: Author = {
      uid: user.uid,
      name: user.name,
      image: {
        href: user.imageUrl,
      },
    };

    // Create the relative URL/name
    try {
      var name = await this.createNameFromTitle(title);
    } catch (err) {
      throw err;
    }

    // Create the href
    const href = this.createHrefFromName(name);

    // Create the id
    const id = this.afs.createId();

    // Get the current time
    const dateCreated = Date.now();

    // Create the post object
    const newPost: Post = {
      id,
      title,
      name,
      href,
      thumbnail,
      author,
      description,
      content,
      tags,
      dateCreated,
      comments: [],
    };

    // Add it to firestore
    try {
      await this.afs.doc<Post>(`/posts/${id}`).set(newPost);
    } catch (err) {
      throw err;
    }

    // Return the post
    return newPost;
  }

  /**
   * Edits an existing post on the database.
   * @param postUpdate the fields to update on the post.
   * @returns the edited Post
   */
  async updatePost(postUpdate: Partial<Post>): Promise<Post> {
    // Store the dateUpdated value
    postUpdate.dateUpdated = Date.now();

    // Check if there is a new title
    if (postUpdate.title) {
      // We need to create a new name
      try {
        postUpdate.name = await this.createNameFromTitle(postUpdate.title);
      } catch (err) {
        throw err;
      }

      // We also need to update the href
      postUpdate.href = this.createHrefFromName(postUpdate.name);
    } else {
      // Check if a new name was included
      if (postUpdate.name) {
        // We need to update the href
        postUpdate.href = this.createHrefFromName(postUpdate.name);
      }
    }

    // Get the document reference
    const documentRef = this.afs.doc<Post>(`/posts/${postUpdate.id}`);

    // Update the document on the database
    try {
      await documentRef.update(postUpdate);
    } catch (err) {
      throw err;
    }

    // Return the updated document
    try {
      return (await documentRef.get().toPromise()).data();
    } catch (err) {
      throw err;
    }
  }

  /**
   * Deletes a post given its ID
   * @param postId the post's ID
   * @retunrs a promise to post deletion confirmation
   * @throws BlogService Error
   */
  async deletePost(postId: string): Promise<PostDeleted> {
    // Create the document reference
    const docRef = this.afs.doc<Post>(`/posts/${postId}`);

    // Check if the document exists
    if (!(await docRef.get().toPromise()).exists) {
      // Return an error
      const err: BlogServiceError = {
        code: 404,
        error: 'not-found',
        description: "The blog post doesn't exist.",
      };
      throw err;
    }

    // Delete the document
    return docRef.delete().then(() => {
      // Create the deleted message
      const deleted: PostDeleted = {
        id: postId,
        message: 'Blog post deleted.',
      };
      return deleted;
    });
  }

  /**
   *
   * COMMENTS
   *
   */

  /**
   * Add a comment to a blog post.
   * @param newComment the comment to be added
   * @returns the comment object
   */
  async addComment({ content, postId }: NewComment): Promise<Comment> {
    // Get the current user
    const user = await this.auth.getSignedInUser();

    // Check that the user exists
    if (!user) {
      // Throw an error of unauthenticated
      const err: BlogServiceError = {
        code: 401,
        error: 'unauthenticated',
        description: 'You must be logged in to post a comment.',
      };
      throw err;
    }

    // Create the comment Id
    const id = this.afs.createId();

    // Create the document reference
    const docRef = this.afs.doc<Post>(`/posts/${postId}`);

    // Check that the post exists
    if (!(await docRef.get().toPromise()).exists) {
      // Throw an error
      const err: BlogServiceError = {
        code: 404,
        error: 'not-found',
        description: "The blog post couldn't be found.",
      };
      throw err;
    }

    // Create the comment ref
    const commentRef = this.afs.doc<Comment>(`/posts/${postId}/comments/${id}`);

    // Create the comment object
    const comment: Comment = {
      id,
      author: {
        uid: user.uid,
        name: user.name,
        image: {
          href: user.imageUrl,
        },
      },
      content,
      dateCreated: Date.now(),
    };

    // Add the comment
    try {
      await commentRef.set(comment);
    } catch (err) {
      throw err;
    }

    // Return the complete comment
    return comment;
  }

  /**
   * Delete a comment from a post.
   * @param postId the ID of the post
   * @param commentId the Id of the comment
   */
  async deleteComment(
    postId: string,
    commentId: string
  ): Promise<DeletedComment> {
    // Get the comment ref
    const commentRef = this.afs.doc(`/posts/${postId}/comments/${commentId}`);

    // Delete the comment
    return commentRef
      .delete()
      .then(() => {
        // Return the deleted comment object
        const deleted: DeletedComment = {
          id: commentId,
          message: 'The comment was deleted.',
        };
        return deleted;
      })
      .catch((err) => {
        throw err;
      });
  }

  /**
   *
   * UTILS
   *
   */

  /**
   * Create a url-safe name from a given title
   * @param title the title string
   * @returns a string with the URL-Safe name
   */
  private async createNameFromTitle(title: string): Promise<string> {
    // Create the name
    var name = title
      .split(' ')
      .map((set) => set.match(/[0-9a-zA-Z]/g).join(''))
      .join('-');

    // Check that the name is available
    try {
      var available = await this.checkName(name);
    } catch (err) {
      throw err;
    }

    if (available) {
      // The name is available, we can return the name
      return name;
    } else {
      // Add an integer to the end and loop
      var loop = true;
      var i = 1;
      while (loop) {
        // Append the integer to the end of the name
        name = `${name}-${i}`;

        // Check the name
        try {
          var available = await this.checkName(name);
        } catch (err) {
          throw err;
        }

        if (available) {
          // Return the name
          loop = false;
          return name;
        } else {
          // Increment the integer
          i++;
        }
      }
    }
  }

  /**
   * Creates the URL to a blog post given the url-safe name
   * @param name the url-safe name
   * @returns the URL to the blog post
   */
  private createHrefFromName(name: string): string {
    return `https://jacobianmatthews.com/blog/${name}`;
  }

  /**
   * Checks if a name (relative url) exists already
   * @param name the name to check
   * @returns true if the name is available
   */
  private async checkName(name: string): Promise<boolean> {
    // Find the document
    try {
      var doc = await this.collection.ref.where('name', '==', name).get();
    } catch (err) {
      throw err;
    }

    // Check if it exists
    if (doc.empty) {
      // It doesn't exist
      return true;
    } else {
      // It already exists
      return false;
    }
  }
}
