import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("userAuthToken");
      if (!token) {
        toast.error("Authentication token is missing.");
        return;
      }

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/common/get-notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(data?.data || []);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch notifications"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    const token = localStorage.getItem("userAuthToken");
    if (!token) {
      toast.error("Authentication token is missing.");
      return;
    }

    setDeleting(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/common/delete-notifications`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications([]);
      toast.success("All notifications deleted successfully.");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to delete notifications"
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
        <span className="ml-4 text-lg font-semibold text-gray-600">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-white rounded-xl shadow p-5 text-center">
        <img
          src="./images/notification-icon.png"
          alt="Notification Icon"
          className="w-16 h-16 mx-auto mb-4"
          onError={(e) => {
            e.currentTarget.src = "./images/notification-icon.png";
          }}
        />
        <h2 className="text-lg font-semibold text-blue-600 mb-2">
          Notifications
        </h2>
        <p className="text-sm text-gray-500">
          Stay informed with your latest updates and alerts.
        </p>
      </div>

      {/* Notification List */}
      <div className="w-full lg:w-3/4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">
            Recent Notifications
          </h1>
          {notifications.length > 0 && (
            <button
              onClick={handleDeleteAll}
              disabled={deleting}
              className="text-sm px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete All"}
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="text-center text-gray-500 text-sm mt-10">
            No notifications available.
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((note, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4"
              >
                <h3 className="text-gray-800 font-medium">{note.title}</h3>
                <p className="text-sm text-gray-600">{note.body}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(note.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
