import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadNotificationIds, setUnreadNotificationIds] = useState<string[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("userAuthToken");
  if (!token) {
    toast.error("Authentication token is missing.");
    navigate("/signin");
  }

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/common/get-notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        const allNotifications = response.data?.data || [];
        const unread = allNotifications
          .filter((n: any) => !n.isRead)
          .map((n: any) => n._id);

        setNotifications(allNotifications);
        setUnreadNotificationIds(unread);

        if (unread.length > 0) {
          try {
            await axios.post(
              `${
                import.meta.env.VITE_API_BASE_URL
              }/api/v1/common/read-notifications`,
              { notifications: unread },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
          } catch (error: any) {
            if (error.response?.data?.code === 401) {
              localStorage.removeItem("userAuthToken");
              toast.error("Unauthorized access. Please log in again.");
              navigate("/signin");
            }
            toast.error(
              error?.response?.data?.message ||
                "Failed to mark notifications as read"
            );
          }
        }
        setLoading(false);
      }
    } catch (error: any) {
      if (error.response?.data?.code === 401) {
        localStorage.removeItem("userAuthToken");
        toast.error("Unauthorized access. Please log in again.");
        navigate("/signin");
      }
      toast.error(
        error?.response?.data?.message || "Failed to fetch notifications"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    setDeleting(true);
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/v1/common/delete-notifications`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        setNotifications([]);
        toast.success("All notifications deleted successfully.");
        setLoading(false);
      } else {
        toast.error("Failed to delete notifications.");
      }
    } catch (error: any) {
      if (error.response?.data?.code === 401) {
        localStorage.removeItem("userAuthToken");
        toast.error("Unauthorized access. Please log in again.");
        navigate("/signin");
      }
      toast.error(
        error?.response?.data?.message || "Failed to delete notifications"
      );
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#0077B6]"></div>
        <span className="ml-4 text-lg font-semibold text-gray-600">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className="max-h-screen bg-gray-50 font-sans flex flex-col lg:flex-row gap-6">
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
        <h2 className="text-lg font-semibold text-[#0077B6] mb-2">
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

        <div className="space-y-4">
          {notifications.map((note, index) => {
            const isUnreadInThisRender = unreadNotificationIds.includes(
              note._id
            );
            return (
              <div
                key={index}
                className={`${
                  isUnreadInThisRender ? "bg-[#0077b630]" : "bg-white"
                } rounded-xl shadow-sm hover:shadow-md transition p-4`}
              >
                <h3 className="text-gray-800 font-medium">{note.title}</h3>
                <p className="text-sm text-gray-600">{note.body}</p>
                <p
                  className={`text-xs ${
                    isUnreadInThisRender ? "text-gray-600" : "text-gray-400"
                  }  mt-1`}
                >
                  {new Date(note.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
