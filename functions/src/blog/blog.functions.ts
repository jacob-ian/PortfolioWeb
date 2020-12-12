/**
 * This file contains the blog-related back-end functions.
 *
 * @author Jacob Ian Matthews
 */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { Post } from './blog.models';

// Initliaze Firebase admin
admin.initializeApp();
const firestore = admin.firestore();

/**
 * Create a new Snippet from a blog Post
 */
export const createSnippet = functions.firestore
  .document(`/posts/{postId}`)
  .onCreate(async (snap) => {
    // Grab the document from the snapshot
    const { id, href, title, author, description, thumbnail, dateCreated } = <
      Post
    >snap.data();

    // Create the snippet
    try {
      return await firestore.doc(`/snippets/${id}`).set({
        postId: id,
        href,
        title,
        author,
        description,
        thumbnail,
        dateCreated,
        commentCount: 0,
      });
    } catch (err) {
      // Log the error
      return console.error(`Couldn't create Snippet: ${id}. Error: ${err}`);
    }
  });

/**
 * Update a Snippet from a blog Post
 */
export const updateSnippet = functions.firestore
  .document('/posts/{postId}')
  .onUpdate(async (snap) => {
    // Get the document data
    const {
      id,
      href,
      title,
      author,
      description,
      thumbnail,
      dateCreated,
      dateUpdated,
      commentCount,
    } = <Post>snap.after.data();

    // Update the data
    try {
      return await firestore.doc(`/snippets/${id}`).update({
        href,
        title,
        author,
        description,
        thumbnail,
        dateCreated,
        dateUpdated,
        commentCount,
      });
    } catch (err) {
      // Log the error
      return console.error(`Couldn't update Snippet: ${id}. Error: ${err}.`);
    }
  });

/**
 * Delete a Snippet on deleting a blog Post
 */
export const deleteSnippet = functions.firestore
  .document('/posts/{postId}')
  .onDelete(async (snap) => {
    // Grab the ID of the post
    const postId = snap.data().id;

    // Delete the corresponding snippet
    try {
      return await firestore.doc(`/snippets/${postId}`).delete();
    } catch (err) {
      // Log the error
      return console.error(
        `Couldn't delete Snippet: ${postId}. Error: ${err}.`
      );
    }
  });

/**
 * Notify push notification subscribed clients of a new post.
 */
export const pushNotify = functions.firestore
  .document('/posts/{postId}')
  .onCreate(async (snap) => {
    // Get the title of the post and the href
    const { title, name, author, href } = <Post>snap.data();

    // Define the cloud messaging topic
    const topic = 'posts';

    // Send a notification to the topic
    admin.messaging().sendToTopic(topic, {
      notification: {
        title: `New Blog Post by ${author.name}!`,
        body: title,
        clickAction: href, // for the background message handler
      },
      data: {
        routerLink: `/blog/${name}`, // for the foreground message handler
      },
    });
  });

/**
 * Add a device to a push notification topic.
 */
export const registerToken = functions.https.onCall((data) => {
  // Get the token from the request
  const tokens = [data.token];

  // Add the token to the list
  admin
    .messaging()
    .subscribeToTopic(tokens, 'posts')
    .then(() => {
      return true;
    })
    .catch((err) => {
      // Throw the error back to the client
      throw new functions.https.HttpsError('internal', err);
    });
});
