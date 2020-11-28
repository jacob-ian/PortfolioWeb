import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

import { AuthService } from './auth.service';

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
  author: {
    name: string; // the name of the author
    image: {
      type: 'image/jpeg' | 'image/gif' | 'image/png' | 'image/svg'; // the image type for the thumbnail
      href: string; // the URL of the author's image
    };
  };
  description: string; // the description of the blog post
  content: string; // the Markdown string content
  tags: string[]; // the tags associated with the post
  dateCreated: number; // the created date and time
  dateUpdated?: number; // the date of last edit
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
  // If left blank, it will be populated from the auth service
  author?: {
    name: string; // the name of the author
    image: {
      type: 'image/jpeg' | 'image/gif' | 'image/png' | 'image/svg';
      href: string; // the URL to the author's image
    };
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
  author?: {
    name: string; // the name of the author
    image: {
      type: 'image/jpeg' | 'image/gif' | 'image/png' | 'image/svg';
      href: string; // the URL to the author's image
    };
  };
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

  constructor(private firestore: AngularFirestore, private auth: AuthService) {
    // Define the collection
    this.collection = this.firestore.collection('posts');
  }

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

    // Check how many documents were returned
    if (docs.size > 1) {
      // We have a problem, there should only be one document per name
      const error: BlogServiceError = {
        code: 404,
        error: 'invalid-request',
        description: 'The request was invalid.',
      };
      throw error;
    }

    // We can return the document
    return docs.docs[0].data();
  }

  /**
   * Fetches a post given its ID
   * @param id the ID of the post to fetch
   * @returns a promise to a Post object
   * @throws BlogService Error
   */
  async getPostById(id: string): Promise<Post> {
    // Call firestore to fetch the post that has the matching name
    try {
      var docs = await this.collection.ref.where('id', '==', id).get();
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

    // Check how many documents were returned
    if (docs.size > 1) {
      // We have a problem, there should only be one document per ID
      const error: BlogServiceError = {
        code: 500,
        error: 'internal',
        description: 'There was an internal error.',
      };
      throw error;
    }

    // We can return the document
    return docs.docs[0].data();
  }

  /**
   * Fetches an array of blog posts up to [limit] starting from [offset]
   * @param limit the number of posts to fetch
   * @param offset the post number to start fetching from (for pagination)
   * @param tags the post's tags to search by
   * @param sort the sort by method, default 'new': new first, 'old': old first
   * @param query a search query to filter the posts titles with
   * @returns an array of Post objects
   * @throws BlogServiceError object
   */
  async getPosts(
    limit: number,
    orderBy: 'dateCreated' | 'dateUpdated' | 'title',
    offset?: number,
    tags?: string[],
    query?: string
  ): Promise<Post[]> {
    // Try fetch the documents
    try {
      // Create the document query
      var docQuery = this.collection.ref.orderBy(orderBy).limit(limit);

      // Check if a search query was provided
      if (query) {
        docQuery.where('title', 'in', query);
      }

      // Check if any tags were provided
      if (tags) {
        docQuery.where('tags', 'array-contains', tags);
      }

      // Check if an offset was provided
      if (offset) {
        docQuery.startAt(offset);
      }

      // Fetch the documents
      var docs = await docQuery.get();
    } catch (err) {
      // Rethrow the error
      throw err;
    }

    // Check if anything was returned
    if (docs.empty) {
      // Create an error
      const err: BlogServiceError = {
        code: 404,
        error: 'not-found',
        description: 'No posts were found.',
      };
      throw err;
    }

    // Return the posts
    return docs.docs.map((doc) => doc.data());
  }

  /**
   * Creates a new blog post in the database
   * @param post a PostRequest object
   * @returns a promise of a Post object with the finalised details
   * @throws BlogServiceError object
   */
  async createPost(post: PostRequest): Promise<Post> {
    // Destructure the data
    var { author, title, description, thumbnail, tags, content } = post;

    // Get the logged in user
    const user = this.auth.getLoggedInUser();

    // Check if an author object was defined in the request
    if (!author) {
      // Get the display name and their photo URL
      author = {
        name: user.displayName,
        image: {
          type: 'image/jpeg',
          href: user.photoUrl,
        },
      };
    }

    // Create the title by URL-safing the title
    // Get the first 12 characters of the title and remove all special characters
    // Add dash delimiters
    var name = this.createNameFromTitle(title);

    // Create the href
    const href = this.createHrefFromName(name);

    // Create the id
    const id = this.firestore.createId();

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
    };

    // Add it to firestore
    try {
      var response = await (await this.collection.ref.add(newPost)).get();
    } catch (err) {
      throw err;
    }

    // Check if it exists
    if (!response.exists) {
      // Throw an error
      const err: BlogServiceError = {
        code: 500,
        error: 'internal',
        description: "The post couldn't be saved.",
      };
      throw err;
    }

    // Return the post
    return response.data();
  }

  /**
   * Updates a post given its ID
   * @param post a PostUpdate object
   * @returns promise to a Post with the updated post
   * @throws BlogServiceError
   */
  async updatePost(post: PostUpdate): Promise<Post> {
    // Destructure the input data
    var {
      id,
      title,
      name,
      description,
      content,
      tags,
      thumbnail,
      author,
    } = post;

    // Create the dateUpdated value
    const dateUpdated = Date.now();

    // Find the document with the ID
    try {
      var docs = await this.collection.ref.where('id', '==', id).get();
    } catch (err) {
      throw err;
    }

    // Check that the document exists
    if (docs.empty) {
      // Throw a not found error
      const err: BlogServiceError = {
        code: 404,
        error: 'not-found',
        description: "The blog post couldn't be found",
      };
      throw err;
    }

    // Get the document
    const docRef = docs.docs[0];
    var docData = docRef.data();

    // Update the data
    docData.dateUpdated = dateUpdated;

    // Check if a new name was included
    if (name) {
      // We need to update the href
      var href = this.createHrefFromName(name);

      // Update the two values
      docData.name = name;
      docData.href = href;
    }

    // Check if there is a new title
    if (title) {
      // We need to create a new name
      var name = this.createNameFromTitle(title);

      // We also need to update the href
      var href = this.createHrefFromName(name);

      // Update all three values
      docData.title = title;
      docData.name = name;
      docData.href = href;
    }

    // Check if the author was changed
    if (author) {
      // Update the author
      docData.author = author;
    }

    // Check if the description was changed
    if (description) {
      // Update the description
      docData.description = description;
    }

    // Check if the post content was changed
    if (content) {
      // Update the content
      docData.content = content;
    }

    // Check if the tags were changed
    if (tags) {
      // Update the tags
      docData.tags = tags;
    }

    // Check if the thumbnail was changed
    if (thumbnail) {
      // Update the thumbnail
      docData.thumbnail = thumbnail;
    }

    // Update the document on Firestore
    try {
      await docRef.ref.set(docData);

      // Fetch the updated document
      var updated = await docRef.ref.get();
    } catch (err) {
      throw err;
    }

    // Return the updated document
    return updated.data();
  }

  /**
   * Deletes a post given its ID
   * @param id the post's ID
   * @retunrs a promise to post deletion confirmation
   * @throws BlogService Error
   */
  async deletePost(id: string): Promise<PostDeleted> {
    try {
      // Fetch the post
      var docs = await this.collection.ref.where('id', '==', id).get();
    } catch (err) {
      throw err;
    }

    // Check if a post was returned
    if (docs.empty) {
      // Throw an error
      const err: BlogServiceError = {
        code: 404,
        error: 'not-found',
        description: "The blog post doesn't exist.",
      };
      throw err;
    }

    // Get the document
    var doc = docs.docs[0];

    // Try to delete the document
    return doc.ref
      .delete()
      .then(() => {
        // Return successful
        const success: PostDeleted = {
          id,
          message: 'Blog post deleted.',
        };
        return success;
      })
      .catch((err) => {
        throw err;
      });
  }

  /**
   * Create a url-safe name from a given title
   * @param title the title string
   * @returns a string with the URL-Safe name
   */
  createNameFromTitle(title: string): string {
    return title
      .split(' ')
      .map((set) => set.match(/[0-9a-zA-Z]/g).join(''))
      .join('-');
  }

  /**
   * Creates the URL to a blog post given the url-safe name
   * @param name the url-safe name
   * @returns the URL to the blog post
   */
  createHrefFromName(name: string): string {
    return `https://jacobianmatthews.com/blog/${name}`;
  }
}
