// import { useEffect } from "react";
// import { messaging, getToken, onMessage } from "../utils/firebase";
// import axios from "axios";

// const PushNotification = () => {
//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const permission = await Notification.requestPermission();
//         if (permission === "granted") {
//           const currentToken = await getToken(messaging, {
//             vapidKey:
//               "BP6UQuD5j5ba8Ib6yzpzMWMys0dRIbnI65POGNOHzethEHehj611kKqdERHVDaEHtHyegPgrg7pXpxI_mijgcvE",
//           });

//           if (currentToken) {
//             console.log("FCM Token:", currentToken);

//             // Send token to backend to store or send immediately
//             await axios.post(
//               "http://localhost:3011/api/v1/common/push-notification",
//               {
//                 token: currentToken,
//                 title: "Welcome!",
//                 body: "You are subscribed to push notifications.",
//               }
//             );
//           } else {
//             console.log("No registration token available.");
//           }
//         }
//       } catch (err) {
//         console.error("An error occurred while retrieving token.", err);
//       }
//     };

//     fetchToken();

//     // Listen for foreground messages
//     onMessage(messaging, (payload: any) => {
//       console.log("Message received. ", payload);
//       const { title, body } = payload.notification;
//       new Notification(title, { body });
//     });
//   }, []);

//   return null;
// };

// export default PushNotification;

import { useEffect } from "react";
import { messaging } from "../utils/firebase";
import { getToken } from "firebase/messaging";
import axios from "axios";

interface PushNotificationProps {
  userId: string;
}

const PushNotification = ({ userId }: PushNotificationProps) => {
  useEffect(() => {
    const registerToken = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey:
            "BP6UQuD5j5ba8Ib6yzpzMWMys0dRIbnI65POGNOHzethEHehj611kKqdERHVDaEHtHyegPgrg7pXpxI_mijgcvE", // from Firebase console
        });

        console.log("Got token:", token);

        // Send token to backend to store it
        await axios.post(
          "http://localhost:3011/api/v1/common/generate-fcm",
          {
            userId,
            token,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
    };

    registerToken();
  }, [userId]);

  return null;
};

export default PushNotification;
