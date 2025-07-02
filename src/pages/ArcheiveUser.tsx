import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ArcheiveUser = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArchivedAppointments = async () => {
      try {
        const token = localStorage.getItem("userAuthToken");
        if (!token) {
          toast.error("Authentication token is missing.");
          return;
        }

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/employee/get-archeived`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAppointments(data?.data || []);
      } catch (err: any) {
        toast.error(
          err?.response?.data?.message ||
            "Failed to fetch archived appointments"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArchivedAppointments();
  }, []);

  const handleView = (patient: any) => {
    setSelectedPatient(patient);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedPatient(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm overflow-x-auto">
      <h1 className="text-center text-xl my-3 font-bold">Archive</h1>

      {loading ? (
        <div className="flex justify-center items-center mt-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          <span className="ml-4 text-lg font-semibold text-gray-600">
            Loading...
          </span>
        </div>
      ) : (
        <table className="w-full min-w-[700px] border-collapse">
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
                "Action",
              ].map((head, i) => (
                <th
                  key={i}
                  className="py-2 px-1 text-xs md:text-sm font-medium text-gray-500 uppercase text-center"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center py-6 text-gray-500">
                No archived appointments found.
              </td>
            </tr>
          ) : (
            <tbody className="divide-y divide-gray-200">
              {appointments.map((item, idx) => (
                <tr key={item._id}>
                  <td className="py-2 px-1 text-xs md:text-sm text-center">
                    {idx + 1}
                  </td>
                  <td className="py-2 px-1 text-xs md:text-sm text-center">
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src={
                          `${import.meta.env.VITE_API_BASE_URL}/${
                            item.image
                          }` || "./images/profile_img.svg"
                        }
                        alt={item.patientName}
                        className="w-6 h-6 md:w-8 md:h-8 rounded-full"
                      />
                      <span>{item.patientName}</span>
                    </div>
                  </td>
                  <td className="py-2 px-1 text-xs md:text-sm text-center">
                    {item.age || "N/A"}
                  </td>
                  <td className="py-2 px-1 text-xs md:text-sm text-center">
                    {new Date(item.appointmentDateTime).toLocaleString()}
                  </td>
                  <td className="py-2 px-1 text-xs md:text-sm text-center">
                    {item.labortary || "N/A"}
                  </td>
                  <td className="py-2 px-1 text-xs md:text-sm text-center">
                    {item.priorityLevel || "Normal"}
                  </td>
                  <td className="py-2 px-1 text-xs md:text-sm text-center">
                    <span className="inline-block px-2 py-1 text-xs font-medium text-black border border-black rounded-3xl">
                      {item.specialInstructions || "None"}
                    </span>
                  </td>
                  <td className="py-2 text-xs md:text-sm text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-3xl text-xs font-semibold ${
                        item?.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : item?.status === "rejected"
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
                  <td className="py-2 px-1 text-xs md:text-sm text-center">
                    <span
                      onClick={() => handleView(item)}
                      className="inline-block px-3 py-1 bg-[#F0F9FF] rounded-3xl cursor-pointer"
                    >
                      View
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      )}

      {/* Modal */}
      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl overflow-auto max-h-[90vh] relative">
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
              >
                ✕
              </button>

              <div className="flex flex-col items-start">
                <div className="w-32 h-32 mb-6 rounded-md overflow-hidden bg-gray-300">
                  <img
                    src={
                      `${import.meta.env.VITE_API_BASE_URL}/${
                        selectedPatient.image
                      }` || "./images/profile_img.svg"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h1 className="text-2xl font-bold mb-1">
                  {selectedPatient.patientName}
                </h1>
                <hr className="w-full my-2" />

                <div className="w-full mb-4">
                  <h2 className="text-lg text-gray-500 font-semibold mb-1">
                    Appointment Info
                  </h2>
                  <p className="text-sm">
                    Date:{" "}
                    {new Date(
                      selectedPatient.appointmentDateTime
                    ).toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    Time:{" "}
                    {new Date(
                      selectedPatient.appointmentDateTime
                    ).toLocaleTimeString()}
                  </p>
                  <p className="text-sm">
                    Labortary: {selectedPatient.labortary}
                  </p>
                  <p className="text-sm">
                    Priority: {selectedPatient.priorityLevel}
                  </p>
                  <p className="text-sm">Status: {selectedPatient.status}</p>
                  <p className="text-sm">
                    Special Instructions: {selectedPatient.specialInstructions}
                  </p>
                </div>

                <div className="w-full mb-4">
                  <h2 className="text-lg text-gray-500 font-semibold mb-1">
                    Assigned Employee
                  </h2>
                  <p className="text-sm">
                    Employee ID:{" "}
                    {selectedPatient?.employeeId?.employeeId || "N/A"}
                  </p>
                  <p className="text-sm">
                    Name: {selectedPatient?.employeeId?.fullName || "N/A"}
                  </p>
                </div>

                <div className="w-full">
                  <h2 className="text-lg text-gray-500 font-semibold mb-1">
                    Patient Info
                  </h2>
                  <p className="text-sm">Email: {selectedPatient.email}</p>
                  <p className="text-sm">
                    Phone: {selectedPatient.contactNumber}
                  </p>
                  <p className="text-sm">Gender: {selectedPatient.gender}</p>
                  <p className="text-sm">Address: {selectedPatient.address}</p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default ArcheiveUser;
