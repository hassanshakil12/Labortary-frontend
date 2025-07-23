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
