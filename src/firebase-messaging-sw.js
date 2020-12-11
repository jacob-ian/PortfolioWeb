// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.1.2/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
firebase.initializeApp({
  apiKey: "AIzaSyAk0KMrouGcn7C89Xw7BNIVWzLzufxRxzY",
  authDomain: "jacobianmatthews-portfolio.firebaseapp.com",
  databaseURL: "https://jacobianmatthews-portfolio.firebaseio.com",
  projectId: "jacobianmatthews-portfolio",
  storageBucket: "jacobianmatthews-portfolio.appspot.com",
  messagingSenderId: "1059888186279",
  appId: "1:1059888186279:web:c78555ee8c3875b3c66c82",
  measurementId: "G-8WN7W0MXYX",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// Configure the desktop notifications for when the app is in the background
messaging.onBackgroundMessage(function (payload) {
  // Create the title
  const title = payload.notification.title;

  // Set the options
  const options = {
    body: payload.notification.body,
    icon: "assets/icons/icon-192x192.png",
    clickAction: payload.notification.clickAction,
  };

  // Show the notification
  self.registration.showNotification(title, options);
});
