import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookedRankingTable = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("userAuthToken");
      if (!token) {
        toast.error("Authentication token is missing.");
        return;
      }

      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/v1/employee/get-today-appointments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAppointments(data?.data || []);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to fetch today's appointments"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
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
    <div className="p-4 bg-white rounded-lg shadow-sm overflow-x-auto lg:overflow-visible">
      <h1 className="text-center text-xl font-bold mb-3">
        Today's Appointments
      </h1>
      <table className="w-full border-collapse min-w-[700px]">
        <thead>
          <tr className="border-b border-gray-800">
            {[
              "#",
              "Patient",
              "Age",
              "Date & Time",
              "Labortary",
              "Priority",
              "Instruction",
              "Status",
            ].map((heading, i) => (
              <th
                key={i}
                className="py-3 text-xs md:text-sm font-medium text-gray-500 uppercase text-center"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {appointments.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-6 text-gray-500">
                No appointments scheduled for today.
              </td>
            </tr>
          ) : (
            appointments.map((item, index) => (
              <tr key={item._id || index}>
                <td className="py-2 text-xs md:text-sm text-center">
                  {index + 1}
                </td>
                <td className="py-2 text-xs md:text-sm text-center">
                  <div className="flex items-center justify-center gap-2">
                    <img
                      src={
                        `${import.meta.env.VITE_API_BASE_URL}/${item?.image}` ||
                        "./images/profile_img.svg"
                      }
                      alt={item?.patientName || "Patient"}
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover"
                    />
                    <span>{item?.patientName || "N/A"}</span>
                  </div>
                </td>
                <td className="py-2 text-xs md:text-sm text-center">
                  {item?.age || "N/A"}
                </td>
                <td className="py-2 text-xs md:text-sm text-center">
                  {new Date(item?.appointmentDateTime).toLocaleDateString(
                    "en-US"
                  )}
                  ,{" "}
                  {new Date(item?.appointmentDateTime).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "2-digit",
                    }
                  )}
                </td>
                <td className="py-2 text-xs md:text-sm text-center">
                  {item?.labortary || "N/A"}
                </td>
                <td className="py-2 text-xs md:text-sm text-center capitalize">
                  {item?.priorityLevel || "N/A"}
                </td>
                <td className="py-2 text-xs md:text-sm text-center">
                  {item?.specialInstructions || "N/A"}
                </td>
                <td className="py-2 text-xs md:text-sm text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-3xl text-xs font-semibold ${
                      item?.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : item?.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item?.status
                      ? item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)
                      : "Pending"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookedRankingTable;
