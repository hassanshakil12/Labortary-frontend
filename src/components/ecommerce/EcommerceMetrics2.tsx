import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface DashboardData {
  totalAppointments: number;
  completedAppointments: number;
  pendingAppointments: number;
  totalFees: number;
}

export default function EcommerceMetrics() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("userAuthToken");
        if (!token) {
          toast.error("Authentication token is missing.");
          return;
        }

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/employee/get-dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(data?.data || null);
      } catch (err: any) {
        toast.error(
          err?.response?.data?.message || "Failed to load dashboard metrics"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center bg-white rounded-lg shadow-sm">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0077B6]"></div>
        <span className="ml-3 text-sm text-gray-600 font-medium">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      <MetricCard
        icon="./images/appointments_icon.svg"
        count={data?.totalAppointments || 0}
        label="Total Appointments"
      />
      <MetricCard
        icon="./images/patients_icon.svg"
        count={data?.pendingAppointments || 0}
        label="Pending Appointments"
      />
      <MetricCard
        icon="./images/dollar-sign.png"
        count={`$. ${data?.totalFees?.toLocaleString() || 0}`}
        label="Total Earnings"
      />
    </div>
  );
}

const MetricCard = ({
  icon,
  count,
  label,
}: {
  icon: string;
  count: string | number;
  label: string;
}) => (
  <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300">
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0">
        <img src={icon} alt={label} className="w-10 h-10 object-contain" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-800">{count}</h3>
        <p className="text-sm font-medium text-gray-500 mt-1">{label}</p>
      </div>
    </div>
  </div>
);
