import { Post, Snippet } from '../blog.models';
import { SnippetAdminException } from './snippet-admin-exception';

const INITIAL_COMMENT_COUNT = 0;

export class SnippetAdmin {
  private post: Post;

  constructor(post: Post) {
    this.post = post;
  }

  public async savePostSnippet(): Promise<Snippet> {
    const snippet = this.createSnippetFromPost();
    return await this.saveSnippetToDatabase(snippet);
  }

  private createSnippetFromPost(): Snippet {
    return {
      id: this.post.id,
      title: this.post.title,
      author: this.post.author,
      description: this.post.description,
      dateCreated: this.post.dateCreated,
      url: this.post.url,
      relativeUrl: this.post.relativeUrl,
      thumbnailUrl: this.post.thumbnailUrl,
      commentCount: INITIAL_COMMENT_COUNT,
    };
  }

  private async saveSnippetToDatabase(snippet: Snippet): Promise<Snippet> {
    try {
    } catch (err) {
      this.createSnippetException(err);
    }
  }

  private createSnippetException(error: any) {
    throw new SnippetFunctionException('internal-error', error.message);
  }
}
