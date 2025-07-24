import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Laboratories = () => {
  const [laboratories, setLaboratories] = useState<any[]>([]);
  const [selectedLab, setSelectedLab] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const handleView = (laboratory: any) => {
    setSelectedLab(laboratory);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedLab(null);
    document.body.style.overflow = "auto";
  };

  const handleDeleteClick = (laboratory: any) => {
    setSelectedLab(laboratory);
    setIsConfirmDeleteOpen(true);
    document.body.style.overflow = "hidden";
  };

  const token = localStorage.getItem("userAuthToken");
  if (!token) {
    toast.error("Authentication token is missing.");
    navigate("/signin");
    return;
  }

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/delete-laboratory/${
          selectedLab._id
        }`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status) {
        setLaboratories((prev) =>
          prev.filter((e) => e._id !== selectedLab._id)
        );
        toast.success("Laboratory deleted successfully");
      } else {
        toast.error("Failed to delete laboratory");
      }
    } catch (error: any) {
      if (error.response?.data?.code === 401) {
        localStorage.removeItem("userAuthToken");
        toast.error("Unauthorized access. Please log in again.");
        navigate("/signin");
      }
      toast.error(
        error?.response?.data?.message || "Failed to delete laboratory"
      );
    } finally {
      setDeleting(false);
      setIsConfirmDeleteOpen(false);
      setSelectedLab(null);
      document.body.style.overflow = "auto";
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
    setSelectedLab(null);
    document.body.style.overflow = "auto";
  };

  const fetchLab = async () => {
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
        setLaboratories(res.data?.data || []);
      } else {
        toast.error("Failed to fetch laboratories");
      }
    } catch (error: any) {
      if (error.response?.data?.code === 401) {
        localStorage.removeItem("userAuthToken");
        toast.error("Unauthorized access. Please log in again.");
        navigate("/signin");
      }
      toast.error(
        error?.response?.data?.message || "Failed to fetch laboratories"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLab();
  }, []);

  return (
    <>
      <div className="container mx-auto">
        {loading ? (
          <div className="min-h-[300px] flex items-center justify-center bg-white rounded-lg shadow-sm">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0077B6]"></div>
            <span className="ml-3 text-sm text-gray-600 font-medium">
              Loading...
            </span>
          </div>
        ) : laboratories.length === 0 ? (
          <div className="min-h-[200px] flex items-center justify-center text-gray-500 text-center">
            No laboratories found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {laboratories.map((laboratory, index) => (
              <div
                key={laboratory._id || index}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition hover:shadow-lg"
              >
                <div className="aspect-square">
                  <img
                    src={
                      `${import.meta.env.VITE_API_BASE_URL}/${
                        laboratory.image
                      }` || "./images/profile_img.svg"
                    }
                    alt={laboratory.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {laboratory.fullName}
                  </p>
                  <div className="mt-3 flex justify-center gap-3">
                    <button
                      onClick={() => handleView(laboratory)}
                      className="text-xs px-4 py-1 bg-[#0076b620] text-[#0077B6] rounded-md hover:bg-[#0076b640]"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteClick(laboratory)}
                      className="text-xs px-4 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Modal */}
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
                        selectedLab.image
                      }` || "./images/profile_img.svg"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold mb-1">
                  {selectedLab.fullName}
                </h1>
                <hr className="w-full my-2" />
                <div className="w-full mb-4">
                  <h2 className="text-lg text-gray-500 font-semibold mb-1">
                    Other Information
                  </h2>
                  <p className="text-sm">Laboratory ID: {selectedLab._id}</p>
                  <p className="text-sm">
                    Joined:{" "}
                    {selectedLab.createdAt
                      ? new Date(selectedLab.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "N/A"}
                  </p>
                </div>
                <div className="w-full mb-4">
                  <h2 className="text-lg text-gray-500 font-semibold mb-1">
                    Contact Information
                  </h2>
                  <p className="text-sm">Email: {selectedLab.email}</p>
                  <p className="text-sm">Phone: {selectedLab.contactNumber}</p>
                  <p className="text-sm">Address: {selectedLab.address}</p>
                </div>
                <div className="w-full">
                  <h2 className="text-lg text-gray-500 font-semibold mb-1">
                    Timing Information
                  </h2>
                  {/* Days of week to iterate over */}
                  {(() => {
                    const daysOfWeek = [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ] as const;

                    /** Helper: format HH:mm / ISO → 9:00 AM */
                    const formatTime = (t: string) =>
                      new Date(t).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      });

                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {daysOfWeek.map((day) => {
                          const entry =
                            Array.isArray(selectedLab.timings) &&
                            selectedLab.timings.find(
                              (tim: { day: string }) => tim.day === day
                            );

                          const hasValidTime =
                            entry &&
                            Array.isArray(entry.time) &&
                            entry.time.length === 2 &&
                            entry.time[0] &&
                            entry.time[1];

                          return (
                            <div
                              key={day}
                              className="border border-gray-200 rounded-xl p-4 shadow-sm bg-gray-50"
                            >
                              <h3 className="text-base font-medium text-gray-600">
                                {day}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {hasValidTime
                                  ? `${formatTime(
                                      entry.time[0]
                                    )} — ${formatTime(entry.time[1])}`
                                  : "Off Day"}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Delete Confirmation Modal */}
      {isConfirmDeleteOpen &&
        createPortal(
          <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full relative">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {deleting
                  ? "Deleting laboratory..."
                  : "Are you sure you want to delete this laboratory?"}
              </h2>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancelDelete}
                  className="px-4 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Laboratories;
