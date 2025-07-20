import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import toast from "react-hot-toast";

interface WeeklyData {
  week: string;
  appointmentCount: number;
}

interface TopLab {
  laboratoryId: string;
  labortary: string;
  weeklyAppointments: WeeklyData[];
}

interface DashboardData {
  totalAppointments: number;
  completedAppointments: number;
  pendingAppointments: number;
  rejectedAppointments: number;
  totalEarnings: number;
  weeklyAppointments: {
    currentLaboratory: WeeklyData[];
    topLaboratories: TopLab[];
  };
}

const EcommerceMetrics = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const userName = localStorage.getItem("userFullName") || "You";

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("userAuthToken");
        if (!token) {
          throw new Error("Missing authentication token.");
        }

        const res = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/v1/laboratory/get-dashboard`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const metrics = res.data?.data?.metrics;
        const weeklyAppointments = res.data?.data?.weeklyAppointments;

        if (!metrics || !weeklyAppointments) {
          throw new Error("Incomplete data from server.");
        }

        setData({ ...metrics, weeklyAppointments });
      } catch (err: any) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load dashboard data.";
        toast.error(message);
        setError(message);
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const chartData =
    data?.weeklyAppointments?.currentLaboratory?.map((week, idx) => {
      const base: any = {
        week: week.week,
        [userName]: week.appointmentCount,
      };

      data.weeklyAppointments.topLaboratories.forEach((lab) => {
        base[lab.labortary] =
          lab.weeklyAppointments[idx]?.appointmentCount || 0;
      });

      return base;
    }) || [];

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg max-w-lg">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
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
        count={`$. ${data?.totalEarnings || 0}`}
        label="Total Earnings"
      />

      {chartData.length > 0 ? (
        <div className="col-span-full bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Weekly Appointment Trends (Last 5 Weeks)
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Line
                type="monotone"
                dataKey={userName}
                stroke="#0077B6"
                activeDot={{ r: 8 }}
              />
              {data.weeklyAppointments.topLaboratories.map((lab, idx) => (
                <Line
                  key={lab.laboratoryId}
                  type="monotone"
                  dataKey={lab.labortary}
                  stroke={["#FF6B6B", "#FFA500", "#00B894"][idx % 3]}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="col-span-full bg-yellow-50 text-yellow-800 p-6 mt-4 rounded-lg text-center">
          No weekly data available to display chart.
        </div>
      )}
    </div>
  );
};

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

export default EcommerceMetrics;
