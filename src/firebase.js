import { initializeApp } from 'firebase/app';
import { getToken, getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBORxEFRGgJJEOxTKgTjCB5XAnuFHIVzY8",
  authDomain: "pushnotify-cc94c.firebaseapp.com",
  projectId: "pushnotify-cc94c",
  storageBucket: "pushnotify-cc94c.appspot.com",
  messagingSenderId: "1090334234472",
  appId: "1:1090334234472:web:18d947a485e8f33c5ea8dd",
  measurementId: "G-4KLY0522P4"
};

console.log('*** Environment ***', process.env.REACT_APP_ENV)
console.log('*** Firebase Config ***', firebaseConfig)

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getOrRegisterServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    return window.navigator.serviceWorker
      .getRegistration('/firebase-push-notification-scope')
      .then((serviceWorker) => {
        if (serviceWorker) return serviceWorker;
        return window.navigator.serviceWorker.register('/firebase-messaging-sw.js', {
          scope: '/firebase-push-notification-scope',
        });
      });
  }
  throw new Error('The browser doesn`t support service worker.');
};

export const getFirebaseToken = () =>
  getOrRegisterServiceWorker()
    .then((serviceWorkerRegistration) =>
      getToken(messaging, { vapidKey: 'BNXImbuB0cQE9y1fgeIvtlFAwChQYBs5l6T_NkJYqsA_rQD0Tr9k5Q8BkCWOwh_qwONVFNcMVJeqUNmpOwaS9-s', serviceWorkerRegistration }));

export const onForegroundMessage = () =>
  new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));
