import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("userAuthToken");
        if (!token) {
          toast.error("Authentication token is missing.");
          return;
        }

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/get-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfile(data?.data || null);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex justify-center items-start font-sans">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-10 border border-gray-200">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            <img
              src={
                `${import.meta.env.VITE_API_BASE_URL}/${profile.image}` ||
                "./images/profile_img.svg"
              }
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "./images/profile_img.svg";
              }}
            />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
              {profile.fullName}
            </h1>
            <p className="text-gray-500 mt-1">{profile.jobRole}</p>
            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <p>
                Employee ID:{" "}
                <span className="font-semibold">{profile._id}</span>
              </p>
              <p>
                Joined:{" "}
                <span className="font-semibold">
                  {profile.hireDate
                    ? new Date(profile.hireDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="grid gap-8 md:grid-cols-2">
          <ProfileSection title="Contact Information">
            <InfoRow label="Email" value={profile.email} />
            <InfoRow label="Phone" value={profile.contactNumber} />
            <InfoRow label="Address" value={profile.address} />
          </ProfileSection>

          <ProfileSection title="Basic Information">
            <InfoRow label="Gender" value={profile.gender} />
            <InfoRow label="Department" value={profile.department || "N/A"} />
            <InfoRow
              label="Status"
              value={profile.isActive ? "Online" : "Offline"}
            />
          </ProfileSection>
        </div>
      </div>
    </div>
  );
};

// Reusable section with hover and transition
const ProfileSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white hover:shadow-lg transition-all duration-300 rounded-xl p-6 border border-gray-100">
    <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>
    <div className="space-y-3">{children}</div>
  </div>
);

// Info row for label-value pairs
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-sm text-gray-600">
    <span className="font-medium">{label}</span>
    <span className="text-gray-800 text-right max-w-[60%] break-words">
      {value || "N/A"}
    </span>
  </div>
);

export default ProfilePage;
