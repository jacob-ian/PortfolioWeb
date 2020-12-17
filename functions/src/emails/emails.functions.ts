/**
 * This file contains the Cloud Functions that are related to emailing customers.
 * @author Jacob Ian Matthews
 */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { createTransport } from 'nodemailer';
import Mail = require('nodemailer/lib/mailer');
import { URLSearchParams } from 'url';
import { SentMail } from './emails.models';

const firestore = admin.firestore();

/**
 * Send an email to newsletter subscribers on making a new blog post.
 */
export const notifyNewPost = functions.firestore
  .document('/posts/{postId}')
  .onCreate(async (snap) => {
    // Get the mailing list from Firestore
    try {
      var listRef = await admin.firestore().collection('emails').get();
    } catch (err) {
      throw err;
    }

    // Check if there are any emails returned
    if (listRef.empty) {
      // We can stop
      return;
    }

    // Create the mailing list
    var mailingList: { email: string; uid: string }[] = listRef.docs.map(
      (doc) => {
        return { email: doc.data().email, uid: doc.data().uid };
      }
    );

    // Get the post information
    const { title, description, href, thumbnail, author, tags } = snap.data();

    // Create the email transport
    var transporter = createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'jacob@jacobian.com.au',
        clientId: functions.config().oauth.client_id,
        clientSecret: functions.config().oauth.client_secret,
        refreshToken: functions.config().oauth.refresh_token,
      },
    });

    // Create the basic mail details
    const from = "Jacob's Blog notify@jacobianmatthews.com";
    const subject = `New Post: ${title}`;

    // Loop through each email on the list to send an individualised email
    mailingList.forEach((address) => {
      // Create the plaintext message
      const plainText = `A new article was just posted by ${author.name} on Jacob's Blog!

${title}
${description}

The article can be read here:
${href}



You are receiving this because you are currently subscribed to post notifications at Jacob's Blog. To unsubscribe, please follow this address:

https://jacobianmatthews.com/unsubscribe?uid=${address.uid}`;

      // Create the unsubscribe URL
      var unsubParams = new URLSearchParams();
      unsubParams.append('uid', address.uid);
      const unsubscribeUrl = `https://jacobianmatthews.com/unsubscribe?${unsubParams.toString()}`;

      // Create the email template
      const html = `<!DOCTYPE html>
  <html lang="en"
    style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: block; --primary-color: #515c6b; --secondary-color: #8a8e98; --background-color: var(--secondary-color); --accent-color: #d7b0a1; --font-color: #111; --card-color: #fff; font-size: 16px; margin: 0;">
  
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="UTF-8">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
  
    <style>
      @media (prefers-color-scheme: dark) {
        :root {
          --background-color: #282c31;
          --primary-color: #fff;
          --font-color: #fff;
          --card-color: #333;
        }
      }
  
      body {
        margin: 0;
      }
  
      body {
        font-family: Comfortaa, Arial, Helvetica, sans-serif;
        width: 100%;
        background-color: #8a8e98;
      }
  
      .read-btn:active {
        outline: none;
      }
  
      .read-btn:focus {
        outline: none;
      }
  
      .read-btn:hover {
        transform: scale(1.1);
        -webkit-box-shadow: 0px 5px 11px 0px rgba(50, 50, 50, 0.6);
        -moz-box-shadow: 0px 5px 11px 0px rgba(50, 50, 50, 0.6);
        box-shadow: 0px 5px 11px 0px rgba(50, 50, 50, 0.6);
      }
  
      .read-btn:focus {
        transform: scale(1.1);
        -webkit-box-shadow: 0px 5px 11px 0px rgba(50, 50, 50, 0.6);
        -moz-box-shadow: 0px 5px 11px 0px rgba(50, 50, 50, 0.6);
        box-shadow: 0px 5px 11px 0px rgba(50, 50, 50, 0.6);
      }
  
      @font-face {
        font-family: 'Comfortaa';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url('https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4TbMPrQ.ttf') format('truetype');
      }
  
      @font-face {
        font-family: 'Comfortaa';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4WjMPrQ.ttf') format('truetype');
      }
  
      @font-face {
        font-family: 'Comfortaa';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4VrMPrQ.ttf') format('truetype');
      }
  
      @font-face {
        font-family: 'Comfortaa';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4bbLPrQ.ttf') format('truetype');
      }
  
      @font-face {
        font-family: 'Comfortaa';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LPrQ.ttf') format('truetype');
      }
  
      @font-face {
        font-family: 'Yeseva One';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('https://fonts.gstatic.com/s/yesevaone/v15/OpNJno4ck8vc-xYpwWWxpio.ttf') format('truetype');
      }
  
      @media only screen and (max-width: 500px) {
        .card {
          padding: 20px 20px;
        }
  
        .card .post .thumbnail {
          width: 250px;
        }
      }
  
      @media only screen and (max-width: 1000px) {
        .card .post .thumbnail {
          width: 550px;
        }
      }
    </style>
  </head>
  
  <body
    style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: block; font-family: Comfortaa, Arial, Helvetica, sans-serif; width: 100%; margin: 0;"
    bgcolor="#8a8e98">
    <div class="container"
      style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: block; font-size: 16px; width: 100%; background-color: #8a8e98; padding: 20px 10px;">
      <div class="card"
        style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: block; background-color: #fff; border-radius: 20px; width: 95%; color: #111; margin: 0 auto; padding: 20px 100px;"
        align="center">
        <div class="blog-name"
          style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: block; font-family: Yeseva One, serif; font-size: 2rem; margin: 30px 0;">
          <a href="https://jacobianmatthews.com/blog" target="_blank"
            style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: block; color: #515c6b; font-weight: bold; text-decoration: none;">
            Jacob's Blog
          </a>
        </div>
        <div class="email-title"
          style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: block;">
          <h1
            style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: block; font-size: 1rem; color: #111; opacity: 0.8; margin-bottom: 30px; font-weight: 700;">
            New Blog Post!
          </h1>
        </div>
        <hr
          style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: block; margin: 30px 0;">
        <a class="post" href="${href}" target="_blank"
          style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: block; color: #111; font-weight: bold; text-decoration: none; margin: 40px 0;">
          <h1
            style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: block; font-size: 1.5rem; font-weight: 700; margin: 0 0 30px;"
            align="center">${title}</h1>
          <img class="thumbnail" src="${thumbnail}" alt="Thumbnail"
            style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: block; height: auto; width: 80%; border-radius: 20px; margin: 20px auto;">
          <p class="description"
            style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: block; margin-top: 30px; margin-bottom: 0; font-weight: 300;">
            ${description}</p>
          <p class="tags"
            style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: block; margin-top: 15px; margin-bottom: 40px; font-size: 0.8rem; font-weight: 300;">
            Tags: ${tags}</p>
        </a>
        <hr
          style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: block; margin: 30px 0;">
        <div class="blog-links"
          style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: block; font-weight: 300; margin: 30px 0;">
          <a class="read-btn" href="${href}" target="_blank"
            style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: inline-block; color: #fff !important; font-weight: 700; text-decoration: none; background-color: #d7b0a1; border-radius: 30px; transition: all ease 0.2s; outline: none; margin-top: 0px; margin-bottom: 20px; width: auto; padding: 15px 30px;">Read</a>
          <div class="or"
            style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: block;">
            or</div>
          <a class="see-more" href="https://jacobianmatthews.com/blog" target="_blank"
            style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: inline-block; color: #d7b0a1; font-weight: 700; text-decoration: none; margin-top: 20px; margin-bottom: 0;">See
            More Posts</a>
        </div>
      </div>
      <div class="footer"
        style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: block; flex: 0; font-size: 0.7rem; color: rgba(255, 255, 255, 0.8); padding: 20px 0;"
        align="center">
        <p
          style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: block; margin: 0 0 5px;">
          This email was sent to <a href="mailto:${address.email}"
            style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: inline-block; color: #d7b0a1; font-weight: bold; text-decoration: none;">${address.email}.</a>
        </p>
        <p
          style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: block; margin: 0 0 5px;">
          You are receiving this because you are subscribed to post notifications at Jacob's Blog.
        </p>
        <p
          style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: block; margin: 0 0 5px;">
          To unsubscribe, please click <a href="${unsubscribeUrl}" target="_blank"
            style="-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; -ms-box-sizing: border-box !important; box-sizing: border-box !important; display: inline-block; color: #d7b0a1; font-weight: bold; text-decoration: none;">here</a>.
        </p>
      </div>
    </div>
  
  </body>
  
  </html>`;

      // Create the mail options object
      const mail: Mail.Options = {
        to: address.email,
        from,
        replyTo: 'support@jacobianmatthews.com',
        subject,
        html,
        text: plainText,
      };

      // Send the message
      transporter.sendMail(mail, (err) => {
        // Check for an error
        if (err) {
          // Log the error
          console.error(err);
        }
      });
    });

    // Add this email to the mail database to keep a log
    // Create the mail ref
    const collection = firestore.collection('mail');

    // Create the email
    const sentMail: SentMail = {
      to: mailingList.map((item) => item.email),
      from,
      subject,
      timestamp: Date.now(),
    };

    // Add the mail to the database
    try {
      await collection.add(sentMail);
    } catch (err) {
      // Log the error
      console.error(err);
    }
  });
