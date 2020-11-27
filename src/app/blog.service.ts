import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

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
  error: string; // the name of the error
  description: string; // the human-readable description of the error
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private firestore: AngularFirestore, private auth: AuthService) {}

  /**
   * Fetches a Blog Post object by URL name
   * @param name the URL-safe name of the post
   * @returns the Post object
   * @throws BlogServiceError object
   */
  async getPostByName(name: string): Promise<Post> {
    return null;
  }

  /**
   * Fetches a post given its ID
   * @param id the ID of the post to fetch
   * @returns a promise to a Post object
   * @throws BlogService Error
   */
  async getPostById(id: string): Promise<Post> {
    return null;
  }

  /**
   * Fetches an array of blog posts up to [limit] starting from [offset]
   * @param limit the number of posts to fetch
   * @param offset the post number to start fetching from (for pagination)
   * @param tags the post's tags to search by
   * @param sort the sort by method, default 'new': new first, 'old': old first
   * @param query a search query to filter the posts with
   * @returns an array of Post objects
   * @throws BlogServiceError object
   */
  async getPosts(
    limit: number,
    offset?: number,
    tags?: string[],
    sort?: 'new' | 'old',
    query?: string
  ): Promise<Post[]> {
    return null;
  }

  /**
   * Creates a new blog post in the database
   * @param post a PostRequest object
   * @returns a promise of a Post object with the finalised details
   * @throws BlogServiceError object
   */
  async createPost(post: PostRequest): Promise<Post> {
    return null;
  }

  /**
   * Updates a post given its ID
   * @param post a PostUpdate object
   * @returns promise to a Post with the updated post
   * @throws BlogServiceError
   */
  async updatePost(post: PostUpdate): Promise<Post> {
    return null;
  }

  /**
   * Deletes a post given its ID
   * @param id the post's ID
   * @retunrs a promise to post deletion confirmation
   * @throws BlogService Error
   */
  async deletePost(id: string): Promise<PostDeleted> {
    return null;
  }
}
