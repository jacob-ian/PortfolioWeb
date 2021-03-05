import * as assert from 'assert';
import { Post, Snippet } from '../blog.models';
import { SnippetAdmin } from './snippet-admin';

describe('Test SnippetAdmin', function () {
  let testPost = createTestPost();
  let expectedSnippet = createExpectedSnippet();

  let snippetAdmin = new SnippetAdmin(testPost);

  describe('Test savePostSnippet()', function () {
    it('Created and Expected should be the same.', async function () {
      let actualSnippet = await snippetAdmin.savePostSnippet();
      assert.strictEqual<Snippet>(actualSnippet, expectedSnippet);
    });
  });
});

function createTestPost(): Post {
  return {
    id: '1234',
    title: 'Test Post!',
    relativeUrl: 'test-post',
    url: 'https://jacobianmatthews.com/blog/test-post',
    description: 'This is a test post!',
    category: 'technology',
    thumbnailUrl: 'https//jacobianmatthews.com/assets/icons/icon-512x512.png',
    author: {
      name: 'Jacob Ian Matthews',
      userId: '1',
      imageUrl: 'https://test.example.com',
    },
    markdownContent: '# This is a test post!',
    tags: {
      finance: false,
      development: true,
      politics: false,
      business: false,
      lifestyle: false,
      science: false,
    },
    dateCreated: Date.now(),
    commentCount: 0,
  };
}

function createExpectedSnippet(): Snippet {
  return {
    id: '1234',
    title: 'Test Post!',
    relativeUrl: 'test-post',
    url: 'https://jacobianmatthews.com/blog/test-post',
    description: 'This is a test post!',
    thumbnailUrl: 'https//jacobianmatthews.com/assets/icons/icon-512x512.png',
    author: {
      name: 'Jacob Ian Matthews',
      userId: '1',
      imageUrl: 'https://test.example.com',
    },
    dateCreated: Date.now(),
    commentCount: 0,
  };
}
