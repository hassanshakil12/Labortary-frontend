import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function EcommerceMetrics() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState([
    {
      icon: "./images/doctor_icon.svg",
      count: 0,
      label: "Employees",
    },
    {
      icon: "./images/appointments_icon.svg",
      count: 0,
      label: "Appointments",
    },
    {
      icon: "./images/patients_icon.svg",
      count: 0,
      label: "Patients", // We'll map this to "paid appointments"
    },
  ]);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("userAuthToken");
      if (!token) {
        toast.error("Authentication token is missing.");
        return;
      }

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/get-dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const dashboard = data?.data || {};
        setMetrics([
          {
            icon: "./images/doctor_icon.svg",
            count: dashboard.totalEmployees || 0,
            label: "Employees",
          },
          {
            icon: "./images/appointments_icon.svg",
            count: dashboard.totalAppointments || 0,
            label: "Appointments",
          },
          {
            icon: "./images/patients_icon.svg",
            count: dashboard.pendingAppointments || 0,
            label: "Pending",
          },
        ]);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[100px] flex items-center justify-center bg-white rounded-lg shadow-sm">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0077B6]"></div>
        <span className="ml-3 text-sm text-gray-600 font-medium">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {metrics.map((item, index) => (
        <div
          key={index}
          className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <img
                src={item.icon}
                alt={item.label}
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{item.count}</h3>
              <p className="text-sm font-medium text-gray-500 mt-1">
                {item.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
