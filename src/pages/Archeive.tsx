import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Archeive = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [statusMap, setStatusMap] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilterInput, setStatusFilterInput] = useState("");
  const [priorityFilterInput, setPriorityFilterInput] = useState("");
  const [labortaryFilterInput, setLabortaryFilterInput] = useState("");
  const [employeeIdFilterInput, setEmployeeIdFilterInput] = useState("");
  const [dateFilterInput, setDateFilterInput] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    priorityLevel: "",
    labortary: "",
    employeeId: "",
    dateAndTime: "",
    sortFields: "createdAt",
    sortOrder: -1,
  });
  const [sortFieldInput, setSortFieldInput] = useState("createdAt");
  const [sortOrderInput, setSortOrderInput] = useState(-1);
  const [showFilters, setShowFilters] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [laboratories, setLaboratories] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleApplyFilters = () => {
    setFilters({
      status: statusFilterInput,
      priorityLevel: priorityFilterInput,
      labortary: labortaryFilterInput,
      employeeId: employeeIdFilterInput,
      dateAndTime: dateFilterInput,
      sortFields: sortFieldInput,
      sortOrder: sortOrderInput,
    });
    setPage(1);
  };

  const handleClearFilters = () => {
    setStatusFilterInput("");
    setPriorityFilterInput("");
    setLabortaryFilterInput("");
    setEmployeeIdFilterInput("");
    setDateFilterInput("");
    setSortFieldInput("createdAt");
    setSortOrderInput(-1);

    setFilters({
      status: "",
      priorityLevel: "",
      labortary: "",
      employeeId: "",
      dateAndTime: "",
      sortFields: "createdAt",
      sortOrder: -1,
    });
    setPage(1);
  };

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

  const token = localStorage.getItem("userAuthToken");
  if (!token) {
    toast.error("Authentication token is missing.");
    navigate("/signin");
    return;
  }

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: String(page),
        ...(filters.status && { status: filters.status }),
        ...(filters.priorityLevel && {
          priorityLevel: filters.priorityLevel,
        }),
        ...(filters.labortary && { labortary: filters.labortary }),
        ...(filters.employeeId && { employeeId: filters.employeeId }),
        ...(filters.dateAndTime && { dateAndTime: filters.dateAndTime }),
        ...(filters.sortFields && { sortFields: filters.sortFields }),
        ...(filters.sortOrder !== undefined && {
          sortOrder: filters.sortOrder.toString(),
        }),
      });

      const res = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/v1/admin/get-archeived?${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.status) {
        setAppointments(res.data.data.appointments);
        setTotalPages(res.data.data.totalPages || 1);
      } else {
        toast.error("Failed to load appointments");
      }
    } catch (err: any) {
      if (err.response?.data?.code === 401) {
        localStorage.removeItem("userAuthToken");
        toast.error("Unauthorized access. Please log in again.");
        navigate("/signin");
      }
      toast.error(
        err?.response?.data?.message || "Failed to fetch appointments"
      );
      setError(err?.response?.data?.message || "Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/get-employees`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status) {
        setEmployees(res.data.data || []);
      } else {
        toast.error("Failed to load employees");
      }
    } catch (err: any) {
      if (err.response?.data?.code === 401) {
        localStorage.removeItem("userAuthToken");
        toast.error("Unauthorized access. Please log in again.");
        navigate("/signin");
      }
      toast.error(err?.response?.data?.message || "Failed to load employees");
    }
  };

  const fetchLaboratories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/get-laboratories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status) {
        setLaboratories(res.data.data || []);
      } else {
        toast.error("Failed to load laboratories");
      }
    } catch (err: any) {
      if (err.response?.data?.code === 401) {
        localStorage.removeItem("userAuthToken");
        toast.error("Unauthorized access. Please log in again.");
        navigate("/signin");
      }
      toast.error(
        err?.response?.data?.message || "Failed to load laboratories"
      );
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [page]);

  useEffect(() => {
    fetchAppointments();
  }, [filters]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    fetchLaboratories();
  }, []);

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
      <div className="text-center mt-10 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm overflow-x-auto">
      <h1 className="text-center text-xl my-3 font-bold">Archive</h1>

      <div className="flex justify-start mb-4">
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-[#0077B6] text-white rounded-md hover:bg-[#005f8f] transition-all duration-300 shadow-sm"
        >
          {/* Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform duration-300 ${
              showFilters ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>

          {/* Label */}
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {showFilters && (
        <div
          className="p-4 rounded-lg shadow-sm border border-gray-200 mb-6 animate__animated animate__fadeIn"
          style={{ animationDuration: "300ms" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {/* Date Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Appointment Date
              </label>
              <input
                type="date"
                value={dateFilterInput}
                onChange={(e) => setDateFilterInput(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Status
              </label>
              <select
                value={statusFilterInput}
                onChange={(e) => setStatusFilterInput(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              >
                <option value="" disabled>
                  Select an Status
                </option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Priority
              </label>
              <select
                value={priorityFilterInput}
                onChange={(e) => setPriorityFilterInput(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              >
                <option value="" disabled>
                  Select a priority
                </option>
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Laboratory Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Laboratory
              </label>
              <select
                name="labortary"
                value={labortaryFilterInput}
                onChange={(e) => {
                  const selectedValue = e.target.value;

                  const selectedLab = laboratories.find(
                    (lab) => lab._id === selectedValue
                  );

                  if (selectedLab) {
                    // From DB
                    setLabortaryFilterInput(selectedLab.fullName);
                  } else {
                    // From static options
                    setLabortaryFilterInput(selectedValue);
                  }
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                required
              >
                <option value="" disabled>
                  Select a laboratory
                </option>
                {laboratories.map((lab) => (
                  <option key={lab._id} value={lab.fullName}>
                    {lab.fullName}
                  </option>
                ))}
                {/* Static labs */}
                <option value="Natera">Natera</option>
                <option value="Caredx">Caredx</option>
                <option value="Prosecco study">Prosecco study</option>
                <option value="Assisted Living">Assisted Living</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Employee ID Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Employee ID
              </label>
              <select
                name="employeeId"
                value={employeeIdFilterInput}
                onChange={(e) => setEmployeeIdFilterInput(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                required
              >
                {employees.length > 0 ? (
                  <>
                    <option value="" disabled>
                      Select an employee
                    </option>
                    {employees.map((emp) => (
                      <option key={emp._id} value={emp.employeeId}>
                        {`${emp.employeeId} - ${emp.fullName}`}
                      </option>
                    ))}
                  </>
                ) : (
                  <option value="" disabled>
                    No Employee found
                  </option>
                )}
              </select>
            </div>

            {/* Sort Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Sort By
              </label>
              <select
                value={sortFieldInput}
                onChange={(e) => setSortFieldInput(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              >
                <option value="createdAt">Date</option>
                <option value="patientName">Patient Name</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Sort Order
              </label>
              <select
                value={sortOrderInput}
                onChange={(e) => setSortOrderInput(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              >
                <option value={-1}>Newest First / Z → A</option>
                <option value={1}>Oldest First / A → Z</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 flex-wrap">
            <button
              onClick={handleApplyFilters}
              className="bg-[#0077B6] text-white rounded-md hover:bg-[#005f8f] font-semibold px-6 py-2 text-sm transition duration-200"
            >
              Apply Filters
            </button>

            <button
              onClick={handleClearFilters}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-2 rounded-md text-sm transition duration-200"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

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
        <tbody className="divide-y divide-gray-200">
          {appointments.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center py-6 text-gray-500">
                No archived appointments found.
              </td>
            </tr>
          ) : (
            appointments.map((item, idx) => (
              <tr key={item._id}>
                <td className="py-2 px-1 text-xs md:text-sm text-center">
                  {idx + 1}
                </td>
                <td className="py-2 px-1 text-xs md:text-sm text-center">
                  <div className="flex items-center justify-center gap-2">
                    <img
                      src={
                        `${import.meta.env.VITE_API_BASE_URL}/${item.image}` ||
                        "./images/profile_img.svg"
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
                      item?.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : item?.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item?.status}
                  </span>
                </td>
                <td className="py-2 px-1 text-xs md:text-sm text-center">
                  <span
                    onClick={() => handleView(item)}
                    className="inline-block px-3 py-1 rounded-3xl cursor-pointer text-[#0077B6] hover:underline"
                  >
                    View
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {appointments.length > 0 && (
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md text-sm transition duration-200"
          >
            ←
          </button>
          <span className="text-sm font-medium mt-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md text-sm transition duration-200"
          >
            →
          </button>
        </div>
      )}

      {/* Modal */}
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
                  <p className="text-sm">
                    Employee ID:{" "}
                    {selectedPatient.employeeId?.employeeId || "N/A"}
                  </p>
                </div>

                <div className="w-full mb-4">
                  {selectedPatient.documents?.length > 0 && (
                    <div className="text-sm">
                      <h2 className="text-lg text-gray-500 font-semibold mb-1">
                        Important Documents
                      </h2>
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
                                className="text-[#0077B6] hover:underline break-all"
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
                  {selectedPatient.trackingId ? (
                    <div className="mt-4">
                      <h2 className="text-lg text-gray-500 font-semibold mb-1">
                        Tracking ID Image
                      </h2>
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/${
                          selectedPatient.trackingId
                        }`}
                        alt="Tracking ID"
                        className="w-full max-h-96 object-contain border rounded shadow"
                      />
                    </div>
                  ) : (
                    <div className="mt-4">
                      <h2 className="text-lg text-gray-500 font-semibold mb-1">
                        Tracking ID Image:
                      </h2>
                      <p className="text-sm">No tracking ID image available.</p>
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
                  <p className="text-sm">Age: {selectedPatient.age || "N/A"}</p>
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

export default Archeive;
