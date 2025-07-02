import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(true);

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem("userAuthToken");

      try {
        await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/sign-out`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Logout failed:", error);
      }

      localStorage.removeItem("userAuthToken");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000); // Delay to show loader for at least 1s
    };

    logout();
  }, [navigate]);

  return isLoggingOut ? (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      <span className="ml-4 text-lg font-semibold text-gray-600">
        Logging out...
      </span>
    </div>
  ) : null;
};

export default Logout;
