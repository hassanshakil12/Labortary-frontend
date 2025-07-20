import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(
    "images/profile_img.svg"
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    console.log("Logging out...");
  };

  // Fetch user profile image
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("userAuthToken");
      if (!token) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/laboratory/get-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.data?.data?.image) {
          setProfileImage(response.data.data.image);
        }
      } catch (error) {
        console.error("Failed to fetch user profile image:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative flex items-center gap-4">
      {/* Notification Icon */}
      <Link to="/laboratory-notifications">
        <span className="overflow-hidden h-11 w-11 cursor-pointer flex items-center justify-center">
          <img
            src="/images/notification-icon.png"
            alt="Notification"
            className="h-8 w-8"
          />
        </span>
      </Link>

      {/* User Avatar */}
      <div>
        <div
          onClick={() => setOpen(!open)}
          className="overflow-hidden rounded-full h-11 w-11 cursor-pointer flex items-center justify-center bg-white"
        >
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/${profileImage}`}
            alt="User"
            className="h-11 w-11 object-cover"
          />
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-20">
            <Link
              to="/laboratory-profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/laboratory-logout"
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
