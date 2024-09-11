importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyBORxEFRGgJJEOxTKgTjCB5XAnuFHIVzY8",
  authDomain: "pushnotify-cc94c.firebaseapp.com",
  projectId: "pushnotify-cc94c",
  storageBucket: "pushnotify-cc94c.appspot.com",
  messagingSenderId: "1090334234472",
  appId: "1:1090334234472:web:18d947a485e8f33c5ea8dd",
  measurementId: "G-4KLY0522P4"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
