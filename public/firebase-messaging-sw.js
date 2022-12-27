// importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

// const firebaseConfig = {
//     apiKey: "AIzaSyAqiY-tbwmrbhC-Uv_wIlQEMII28yw7eFg",
//     authDomain: "dwtf-4e314.firebaseapp.com",
//     projectId: "dwtf-4e314",
//     storageBucket: "dwtf-4e314.appspot.com",
//     messagingSenderId: "289887133046",
//     appId: "1:289887133046:web:b54e2685fc703b5cfdee57",
//     measurementId: "G-D68PK05RE1"
//   };

// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log('Received background message: ', payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = { body: payload.notification.body };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });