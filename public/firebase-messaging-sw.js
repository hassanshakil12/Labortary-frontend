importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBQqcgdwsuqfBDPAOY6AP22TNq5WG4VFHc",
  authDomain: "all-mobile-phlebotomy-services.firebaseapp.com",
  projectId: "all-mobile-phlebotomy-services",
  messagingSenderId: "298325785375",
  appId: "1:298325785375:web:45d574709d20c9231cce2a",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: "/logo.png", // optional icon
  });
});
