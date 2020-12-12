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
  tags: Tags; // the tags associated with the post
  dateCreated: number; // the created date and time
  dateUpdated?: number; // the date of last edit
  commentCount: number;
  section: string; // The overarching category of the post
}

/**
 * An object with data for a new post to be created.
 */
export interface PostRequest {
  id: string; // the ID of the post
  title: string; // the name of the post
  name: string; // the url-safe name of the post
  description: string; // the description for the post
  content: string; // the Markdown/HTML content for the post
  tags: Tags; // the tags associated with the post
  thumbnail: {
    type: 'image/jpeg' | 'image/gif' | 'image/png' | 'image/svg';
    href: string; // the URL to the thumbnail image
  };
  section: 'technology' | 'science' | 'business' | 'lifestyle'; // the overarching category of the post
}

/**
 *  An object to show the deletion of a Post
 */
export interface PostDeleted {
  postId: string; // the ID of the deleted post
}

/**
 * A database model for a draft Post
 */
export interface Draft {
  id: string; // the Draft/Post ID
  title: string;
  description?: string;
  content?: string;
  tags?: Tags;
  thumbnail?: {
    href: string;
  };
  dateCreated: number;
  dateUpdated?: number;
}

/**
 * A snippet of a post
 */
export interface Snippet {
  postId: string; // the ID of the full post
  href: string; // the HREF of the full post
  title: string; // the post's title
  author: Author; // the post's author
  description: string; // the post's description
  dateCreated: number; // the time of creation of the post
  dateUpdated: number;
  thumbnail: {
    href: string; // the location of the thumbnail
  };
  commentCount: number; // the number of comments
}

/**
 * A query to fetch a list of snippets
 */
export interface SnippetQuery {
  limit?: number; // limits the number of results
  startAfter?: number; // the timestamp to start after in pagination
  endBefore?: number;
  order?: 'asc' | 'desc'; // the direction of the snippets list
  tags?: Partial<Tags>; // any tags requested in the query
}

/**
 * An interface for the tags available for querying
 */
export interface Tags {
  finance: boolean;
  development: boolean;
  lifestyle: boolean;
  politics: boolean;
  business: boolean;
  science: boolean;
}

/**
 * An interface for the Author of a post
 */
export interface Author {
  uid: string; // the UID of the post's author
  name: string; // the name of the author
  image: {
    href: string; // the location of the author's image
  };
}

/**
 * A comment interface
 */
export interface Comment {
  id: string; // the ID of the comment
  content: string; // the content of the comment
  author: Author; // the author of the comment
  dateCreated: number; // The date/time of creation
}

/**
 * A new comment
 */
export interface NewComment {
  content: string; // the content of the comment
  postId: string; // the id of the post to comment on
}

export interface DeletedComment {
  id: string; // the ID of the comment that was deleted
  message: string; // the confirmation message
}

/**
 * An object containing open graph details
 */
export interface MetaTags {
  title: string; // the page title
  description: string; // the page description
  image?: string; // the image URL of the page
  type?: 'article' | 'website';
  article?: {
    published_time: string; // ISO8601 date time
    modified_time?: string; // ISO8601 date time
    author: string; // the author's name
    section: string; // the overarching category
    tag: string[]; // keywords for the article
  };
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
