/**
 * A Blog Post
 */
export interface Post {
  id: string;
  title: string;
  relativeUrl: string;
  url: string;
  description: string;
  category: 'technology' | 'science' | 'business' | 'lifestyle';
  thumbnailUrl: string;
  author: Author;
  markdownContent: string;
  tags: Tags;
  dateCreated: number;
  dateUpdated?: number;
  commentCount: number;
}

/**
 * A Draft Post
 */
export interface Draft {
  id: string;
  title: string;
  description?: string;
  markdownContent?: string;
  tags?: Tags;
  thumbnailUrl?: string;
  dateCreated: number;
  dateUpdated?: number;
}

/**
 * A snippet of a post
 */
export interface Snippet {
  id: string; // Same as the Post's ID
  title: string;
  author: Author;
  description: string;
  dateCreated: number;
  dateUpdated?: number;
  thumbnailUrl: string;
  relativeUrl: string;
  url: string;
  commentCount: number;
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
 * Tags available for querying.
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
 * A post Author
 */
export interface Author {
  userId: string;
  name: string;
  imageUrl: string;
}

/**
 * A Comment
 */
export interface Comment {
  id: string;
  htmlContent: string;
  author: Author;
  dateCreated: number;
}

/**
 * The OpenGraph Meta Tags
 */
export interface OGMetaTags {
  title: string;
  description: string;
  imageUrl?: string;
  type?: 'article' | 'website';
  article?: {
    published_time: string; // ISO8601 date time
    modified_time?: string; // ISO8601 date time
    author: string;
    category: string; //TODO: Rename category to section in the Meta Tags Service
    keywords: string[]; //TODO: Rename to to "tag"
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
  message: string; // the human-readable description of the error
}
