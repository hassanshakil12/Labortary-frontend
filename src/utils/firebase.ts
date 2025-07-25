// firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBQqcgdwsuqfBDPAOY6AP22TNq5WG4VFHc",
  authDomain: "all-mobile-phlebotomy-services.firebaseapp.com",
  projectId: "all-mobile-phlebotomy-services",
  storageBucket: "all-mobile-phlebotomy-services.firebasestorage.app",
  messagingSenderId: "298325785375",
  appId: "1:298325785375:web:45d574709d20c9231cce2a",
  measurementId: "G-9ZZ66PRQ1J"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const getFcmToken = async () => {
  try {
    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

    const currentToken = await getToken(messaging, {
      vapidKey: "BP6UQuD5j5ba8Ib6yzpzMWMys0dRIbnI65POGNOHzethEHehj611kKqdERHVDaEHtHyegPgrg7pXpxI_mijgcvE",
      serviceWorkerRegistration: registration,
    });

    if (currentToken) {
      return currentToken;
    } else {
      console.warn("No registration token available. Request permission to generate one.");
      return null;
    }
  } catch (err) {
    console.error("FCM Token error:", err);
  }
}

export { messaging, getToken, onMessage, getFcmToken };