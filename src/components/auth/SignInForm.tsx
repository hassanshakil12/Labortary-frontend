import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const EyeIcon = AiOutlineEye;
export const EyeCloseIcon = AiOutlineEyeInvisible;

import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: email, 2: otp, 3: reset
  const [forgotData, setForgotData] = useState({
    email: "",
    role: "employee", // default
    otp: "",
    newPassword: "",
    userId: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/sign-in`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const result = await res.json();

      if (res.ok && result.status) {
        localStorage.setItem("userAuthToken", result.data.userAuthToken);
        navigate(
          result.data.role === "admin"
            ? "/admin-dashboard"
            : result.data.role === "employee"
            ? "/employees-dashboard"
            : result.data.role === "laboratory"
            ? "/laboratory-dashboard"
            : toast.error("Invalid role")
        );
      } else {
        toast.error(result.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleForgotSubmit = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/common/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: forgotData.email,
            role: forgotData.role,
          }),
        }
      );
      const result = await res.json();
      if (res.ok && result.status) {
        toast.success("OTP sent to your email");
        setForgotStep(2);
      } else {
        toast.error(result.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error("Forgot Password Error:", err);
      toast.error("Something went wrong. Try again.");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/common/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: forgotData.email,
            otp: Number(forgotData.otp),
            role: forgotData.role,
          }),
        }
      );
      const result = await res.json();
      if (res.ok && result.status) {
        setForgotData((prev) => ({ ...prev, userId: result.data.userId }));
        setForgotStep(3);
      } else {
        toast.error(result.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("OTP Verification Error:", err);
      toast.error("Something went wrong.");
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/common/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: forgotData.userId,
            newPassword: forgotData.newPassword,
            role: forgotData.role,
          }),
        }
      );
      const result = await res.json();
      if (res.ok && result.status) {
        toast.success("Password reset successfully.");
        setShowForgotModal(false);
        setForgotStep(1);
        setForgotData({
          email: "",
          role: "employee",
          otp: "",
          newPassword: "",
          userId: "",
        });
      } else {
        toast.error(result.message || "Failed to reset password");
      }
    } catch (err) {
      console.error("Reset Password Error:", err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="w-full">
      <div className="min-h-screen flex items-center justify-center bg-blue-200 p-4">
        <div className="flex flex-col md:flex-row bg-blue-100 rounded-3xl shadow-2xl overflow-visible max-w-4xl w-full h-auto md:h-90">
          <div className="w-full md:w-1/2 flex items-center justify-center p-6">
            <img
              src="./images/microscopee.png"
              alt="Microscope"
              className="w-64 md:w-[400px] -mt-10 md:-ms-34"
            />
          </div>

          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold my-6 text-center">
              Login
            </h2>

            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border-b-2 border-gray-400 bg-transparent mb-4 outline-0"
            />

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 border-b-2 border-gray-400 bg-transparent outline-0"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <EyeIcon className="w-4 h-4 text-gray-500" />
                ) : (
                  <EyeCloseIcon className="w-4 h-4 text-gray-500" />
                )}
              </span>
            </div>

            <button
              className="bg-[#0077B6] hover:bg-[#005f8f] transition-all duration-300 text-white font-bold py-2 rounded w-56 mx-auto"
              onClick={handleSignIn}
            >
              Login
            </button>

            <div className="text-right my-4">
              <button
                className="text-sm text-gray-600 hover:underline"
                onClick={() => setShowForgotModal(true)}
              >
                Forgot Password?
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-6">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            {forgotStep === 1 && (
              <>
                <h3 className="text-lg font-semibold mb-4">
                  Enter your email & role
                </h3>
                <input
                  type="email"
                  placeholder="Email"
                  value={forgotData.email}
                  onChange={(e) =>
                    setForgotData({ ...forgotData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border mb-4 outline-0"
                />
                <select
                  value={forgotData.role}
                  onChange={(e) =>
                    setForgotData({ ...forgotData, role: e.target.value })
                  }
                  className="w-full px-4 py-2 border mb-4  outline-0"
                >
                  <option value="admin">Admin</option>
                  <option value="laboratory">Laboratory</option>
                  <option value="employee">Employee</option>
                </select>
                <button
                  className="bg-[#0077B6] hover:bg-[#005f8f] transition-all duration-300 text-white w-full py-2 rounded"
                  onClick={handleForgotSubmit}
                >
                  Send OTP
                </button>
              </>
            )}
            {forgotStep === 2 && (
              <>
                <h3 className="text-lg font-semibold mb-4">
                  Enter OTP sent to your email
                </h3>
                <input
                  type="text"
                  placeholder="OTP"
                  value={forgotData.otp}
                  onChange={(e) =>
                    setForgotData({ ...forgotData, otp: e.target.value })
                  }
                  className="w-full px-4 py-2 border mb-4 outline-0"
                />
                <button
                  className="bg-[#0077B6] hover:bg-[#005f8f] transition-all duration-300 text-white w-full py-2 rounded"
                  onClick={handleVerifyOTP}
                >
                  Verify OTP
                </button>
              </>
            )}
            {forgotStep === 3 && (
              <>
                <h3 className="text-lg font-semibold mb-4">
                  Enter New Password
                </h3>
                <div className="relative mb-4">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={forgotData.newPassword}
                    onChange={(e) =>
                      setForgotData({
                        ...forgotData,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border outline-0"
                  />
                  <span
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    {showNewPassword ? (
                      <EyeIcon className="w-4 h-4 text-gray-500" />
                    ) : (
                      <EyeCloseIcon className="w-4 h-4 text-gray-500" />
                    )}
                  </span>
                </div>

                <button
                  className="bg-[#0077B6] hover:bg-[#005f8f] transition-all duration-300 text-white w-full py-2 rounded"
                  onClick={handleResetPassword}
                >
                  Reset Password
                </button>
              </>
            )}
            <button
              className="mt-4 text-sm text-gray-600 hover:underline"
              onClick={() => setShowForgotModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
