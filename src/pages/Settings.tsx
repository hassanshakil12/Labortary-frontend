import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const EyeIcon = AiOutlineEye;
export const EyeCloseIcon = AiOutlineEyeInvisible;

const Settings = () => {
  const [settings, setSettings] = useState({
    activate: true,
    notifications: true,
    privacy: false,
    twoFactor: false,
  });

  const [loadingKey, setLoadingKey] = useState<null | string>(null);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("userAuthToken");
  if (!token) {
    toast.error("Authentication token is missing.");
    navigate("/signin");
    return;
  }

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/get-profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.status) {
        const userData = res.data.data;
        setUser(userData);
        setImagePreviewUrl(
          `${import.meta.env.VITE_API_BASE_URL}/${userData.image}`
        );
        setForm(userData);

        setSettings({
          activate: userData.isActive,
          notifications: userData.isNotification,
          privacy: false,
          twoFactor: false,
        });
      } else {
        toast.error("Failed to load user data");
      }
    } catch (err: any) {
      if (err.response?.data?.code === 401) {
        localStorage.removeItem("userAuthToken");
        toast.error("Unauthorized access. Please log in again.");
        navigate("/signin");
      }
      toast.error(err?.response?.data?.message || "Failed to load user");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setImagePreviewUrl(null);
    }
  }, [image]);

  const toggleSetting = async (key: keyof typeof settings) => {
    if (!token) return toast.error("Authentication token is missing.");
    setLoadingKey(key);
    try {
      const url =
        key === "notifications" ? "toggle-notification" : "toggle-account";
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/common/${url}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(data?.message || `${key} toggled.`);
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update setting");
    } finally {
      setLoadingKey(null);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!token) return toast.error("Authentication token is missing.");

    const required = [
      "fullName",
      "email",
      "contactNumber",
      "address",
      "gender",
      "username",
    ];
    if (form?.role === "admin") required.push("jobRole", "hireDate");
    for (const field of required) {
      if (!form[field]) return toast.error("All fields are required");
    }

    try {
      setSubmitLoading(true);
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value as string)
      );
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/common/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data?.message || "Profile updated successfully");
      setProfileModalOpen(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!token) return toast.error("Authentication token is missing");
    if (!passwords.oldPassword || !passwords.newPassword)
      return toast.error("All password fields are required");

    try {
      setPasswordLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/common/change-password`,
        passwords,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message || "Password changed successfully");
      setPasswords({ oldPassword: "", newPassword: "" });
      setPasswordModalOpen(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Password update failed");
      console.error("Password update error:", err);
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <aside className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 font-sans text-gray-800 space-y-8">
      <Section title="Account Settings">
        <SidebarItem
          icon="./images/active.png"
          label="Activate Account"
          toggle
          value={settings.activate}
          loading={loadingKey === "activate"}
          onToggle={() => toggleSetting("activate")}
        />
        <SidebarItem
          icon="./images/notification.png"
          label="Notifications"
          toggle
          value={settings.notifications}
          loading={loadingKey === "notifications"}
          onToggle={() => toggleSetting("notifications")}
        />
      </Section>

      <Section title="Privacy & Security">
        <SidebarItem
          icon="./images/privacy.png"
          label="Privacy Settings"
          toggle
          value={settings.privacy}
          onToggle={() =>
            setSettings((prev) => ({ ...prev, privacy: !prev.privacy }))
          }
        />
        <SidebarItem
          icon="./images/2-step.png"
          label="Two-Step Authentication"
          toggle
          value={settings.twoFactor}
          onToggle={() =>
            setSettings((prev) => ({ ...prev, twoFactor: !prev.twoFactor }))
          }
        />
      </Section>

      <button
        onClick={() => setProfileModalOpen(true)}
        className="w-full bg-[#0077B6] text-white py-2 px-4 rounded hover:bg-[#005f8f] transition"
      >
        Update Profile
      </button>
      <button
        onClick={() => setPasswordModalOpen(true)}
        className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
      >
        Change Password
      </button>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-6">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-xl overflow-auto max-h-[90vh] animate-fadeIn">
            <h2 className="text-xl font-semibold mb-6">Update Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Image Preview & Upload */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:col-span-2">
                {imagePreviewUrl ? (
                  <img
                    src={imagePreviewUrl}
                    alt="Profile Preview"
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-[#0077B6] shadow-sm"
                  />
                ) : (
                  <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400 text-xs text-center">
                    No Image
                  </div>
                )}
                <label className="cursor-pointer inline-block px-4 py-2 bg-[#0077B630] text-[#0077B6] rounded-lg border border-[#0077B640] hover:bg-[#0077B630] transition">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {[
                "fullName",
                "email",
                "contactNumber",
                "address",
                "username",
              ].map((name) => (
                <div key={name}>
                  <label
                    htmlFor={name}
                    className="text-sm font-medium block mb-1"
                  >
                    {name[0].toUpperCase() + name.slice(1)}
                  </label>
                  <input
                    id={name}
                    name={name}
                    value={form[name] || ""}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    placeholder={name}
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="gender"
                  className="text-sm font-medium block mb-1"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={form.gender || ""}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="jobRole"
                  className="text-sm font-medium block mb-1"
                >
                  Job Role
                </label>
                <input
                  id="jobRole"
                  name="jobRole"
                  value={form.jobRole || ""}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  placeholder="Job Role"
                />
              </div>
              <div>
                <label
                  htmlFor="hireDate"
                  className="text-sm font-medium block mb-1"
                >
                  Hire Date
                </label>
                <input
                  id="hireDate"
                  name="hireDate"
                  type="date"
                  value={form.hireDate?.slice(0, 10) || ""}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setProfileModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitLoading}
                className="bg-[#0077B6] text-white px-4 py-2 rounded hover:bg-[#005f8f]"
              >
                {submitLoading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-6">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-6">Change Password</h2>
            <div className="space-y-4">
              <div className="mb-4">
                <label
                  htmlFor="oldPassword"
                  className="block text-sm font-medium mb-1"
                >
                  Old Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    id="oldPassword"
                    value={passwords.oldPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        oldPassword: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full pr-10 outline-0"
                    placeholder="Old Password"
                  />
                  <span
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 cursor-pointer"
                  >
                    {showOldPassword ? (
                      <EyeIcon className="w-5 h-5 text-gray-500" />
                    ) : (
                      <EyeCloseIcon className="w-5 h-5 text-gray-500" />
                    )}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium mb-1"
                >
                  New Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    value={passwords.newPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        newPassword: e.target.value,
                      })
                    }
                    className="border p-2 rounded w-full pr-10 outline-0"
                    placeholder="New Password"
                  />
                  <span
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 cursor-pointer"
                  >
                    {showNewPassword ? (
                      <EyeIcon className="w-5 h-5 text-gray-500" />
                    ) : (
                      <EyeCloseIcon className="w-5 h-5 text-gray-500" />
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setPasswordModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                disabled={passwordLoading}
                className="bg-[#0077B6] text-white px-4 py-2 rounded hover:bg-[#005f8f]"
              >
                {passwordLoading ? "Updating..." : "Change Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
      {title}
    </h3>
    <ul className="space-y-3">{children}</ul>
  </div>
);

interface SidebarItemProps {
  icon: string;
  label: string;
  toggle?: boolean;
  value?: boolean;
  loading?: boolean;
  onToggle?: () => void;
}

const SidebarItem = ({
  icon,
  label,
  toggle = false,
  value = false,
  loading = false,
  onToggle,
}: SidebarItemProps) => (
  <li className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#0077B610] transition cursor-pointer">
    <div className="flex items-center gap-3">
      <img src={icon} alt={label} className="w-5 h-5" />
      <span className="text-sm font-medium">{label}</span>
    </div>
    {toggle &&
      (loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0077B6]"></div>
      ) : (
        <label className="relative inline-block w-11 h-6">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={value}
            onChange={onToggle}
          />
          <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-[#0077B6] transition-all duration-200"></div>
          <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 peer-checked:translate-x-5"></div>
        </label>
      ))}
  </li>
);

export default Settings;
