import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Appointments = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [statusMap, setStatusMap] = useState<{ [key: string]: string }>({});
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("userAuthToken");
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/employee/get-appointments`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setAppointments(response.data.data);
      } catch (err: any) {
        const message =
          err?.response?.data?.message || "Failed to fetch appointments";
        toast.error(message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
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

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm overflow-x-auto">
      <h1 className="text-center text-xl my-3 font-bold">Appointments</h1>
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
            ].map((heading) => (
              <th
                key={heading}
                className="py-2 px-1 text-xs md:text-sm font-medium text-gray-500 uppercase text-center"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        {appointments.length === 0 ? (
          <tr>
            <td colSpan={9} className="text-center py-6 text-gray-500">
              No appointments scheduled.
            </td>
          </tr>
        ) : (
          <tbody className="divide-y divide-gray-200">
            {appointments.map((item, i) => (
              <tr key={item._id}>
                <td className="py-2 px-1 text-center">{i + 1}</td>
                <td className="py-2 px-1 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}/${
                        item.image || "images/profile_img.svg"
                      }`}
                      alt={item.patientName}
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover"
                    />
                    <span>{item.patientName}</span>
                  </div>
                </td>
                <td className="py-2 px-1 text-center">{item.age || "N/A"}</td>
                <td className="py-2 px-1 text-center">
                  {new Date(item.appointmentDateTime).toLocaleDateString()}{" "}
                  {new Date(item.appointmentDateTime).toLocaleTimeString()}
                </td>
                <td className="py-2 px-1 text-center">{item.labortary}</td>
                <td className="py-2 px-1 text-center">{item.priorityLevel}</td>
                <td className="py-2 px-1 text-center">
                  <span className="inline-block px-2 py-1 text-xs font-medium text-black border border-black rounded-3xl">
                    {item.specialInstructions}
                  </span>
                </td>
                <td className="py-2 px-1 text-center">{item.status}</td>
                <td className="py-2 px-1 text-center">
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

      {isModalOpen &&
        selectedPatient &&
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
                    src={`${import.meta.env.VITE_API_BASE_URL}/${
                      selectedPatient.image || "images/profile_img.svg"
                    }`}
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
                  <p className="text-sm">
                    Status:{" "}
                    {statusMap[selectedPatient._id] || selectedPatient.status}
                  </p>
                  <p className="text-sm">
                    Special Instructions: {selectedPatient.specialInstructions}
                  </p>
                  {selectedPatient.documents?.length > 0 && (
                    <div className="text-sm">
                      <p className="font-semibold mb-1">Documents:</p>
                      <ul className="list-disc ml-5 space-y-1">
                        {selectedPatient.documents.map(
                          (doc: string, index: number) => (
                            <li key={index}>
                              <a
                                href={`${
                                  import.meta.env.VITE_API_BASE_URL
                                }/${doc}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className="text-blue-600 hover:underline break-all"
                              >
                                {doc.split("/").pop()}
                              </a>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="w-full mb-4">
                  <h2 className="text-lg text-gray-500 font-semibold mb-1">
                    Patient Info
                  </h2>
                  <p className="text-sm">Gender: {selectedPatient.gender}</p>
                  <p className="text-sm">
                    DOB:{" "}
                    {selectedPatient.dateOfBirth
                      ? new Date(
                          selectedPatient.dateOfBirth
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                  <p className="text-sm">
                    Employee ID:{" "}
                    {selectedPatient.employeeId?.employeeId || "N/A"}
                  </p>
                </div>

                <div className="w-full">
                  <h2 className="text-lg text-gray-500 font-semibold mb-1">
                    Contact Info
                  </h2>
                  <p className="text-sm">Email: {selectedPatient.email}</p>
                  <p className="text-sm">
                    Phone: {selectedPatient.contactNumber}
                  </p>
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

export default Appointments;
