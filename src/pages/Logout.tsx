import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Logout = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"logging-out" | "done" | "error">(
    "logging-out"
  );
  const logoutCalled = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("userAuthToken");
    if (!token) {
      toast.error("Authentication token is missing.");
      navigate("/signin", { replace: true });
      return;
    }

    const logout = async () => {
      if (logoutCalled.current) return;
      logoutCalled.current = true;
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/sign-out`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            timeout: 5000,
          }
        );

        if (response.status !== 200) {
          toast.error("Unexpected response from server");
        }

        setStatus("done");
      } catch (error: any) {
        if (error.response?.data?.code === 401) {
          localStorage.removeItem("userAuthToken");
          toast.error("Unauthorized access. Please log in again.");
          navigate("/signin");
        }
        toast.error(
          error?.response?.data?.message ||
            "Logout failed. You'll still be signed out locally."
        );
        setStatus("error");
      } finally {
        localStorage.clear();
        sessionStorage.clear();

        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
        });

        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      }
    };

    logout();
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#0077B6]"></div>
      <span className="ml-4 text-lg font-semibold text-gray-600">
        {status === "logging-out"
          ? "Logging out..."
          : status === "error"
          ? "Logout failed. Redirecting..."
          : "Goodbye..."}
      </span>
    </div>
  );
};

export default Logout;
