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
