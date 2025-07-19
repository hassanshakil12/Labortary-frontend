import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] outline-none"
    />
  </div>
);

const PatientUploadForm: React.FC = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    contactNumber: "",
    address: "",
    accountNumber: "",
    dateOfBirth: "",
    gender: "",
    employeeId: "",
    labortary: "",
    fees: "",
    priorityLevel: "",
    appointmentDateTime: "",
    status: "",
    specialInstructions: "",
    age: "",
    laboratoryId: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [documents, setDocuments] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [laboratories, setLaboratories] = useState<any[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocuments(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("userAuthToken");
    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    if (image) payload.append("image", image);
    if (documents) {
      Array.from(documents).forEach((file) =>
        payload.append("documents", file)
      );
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/create-appointment`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Appointment created successfully!");

      setFormData({
        patientName: "",
        email: "",
        contactNumber: "",
        address: "",
        dateOfBirth: "",
        gender: "",
        employeeId: "",
        labortary: "",
        fees: "",
        priorityLevel: "",
        appointmentDateTime: "",
        status: "",
        specialInstructions: "",
        accountNumber: "",
        age: "",
        laboratoryId: "",
      });
      setImage(null);
      setImagePreviewUrl(null);
      setDocuments(null);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Failed to create appointment"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("userAuthToken");
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/get-employees`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployees(res.data.data || []);
      } catch (err: any) {
        toast.error("Failed to load employees");
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchLaboratories = async () => {
      try {
        const token = localStorage.getItem("userAuthToken");
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/get-laboratories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLaboratories(res.data.data || []);
      } catch (err: any) {
        toast.error("Failed to load laboratories");
      }
    };

    fetchLaboratories();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl space-y-8"
    >
      {/* Image Upload & Preview */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        {/* Image Preview */}
        {imagePreviewUrl ? (
          <img
            src={imagePreviewUrl}
            alt="Patient Preview"
            className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-[#0077B6] shadow-sm"
          />
        ) : (
          <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400 text-xs text-center">
            No Image
          </div>
        )}

        {/* Upload Button */}
        <label className="cursor-pointer inline-block px-4 py-2 bg-[#0077B620] text-[#0077B6] rounded-lg border border-[#0077B640] hover:bg-[#0077B640] transition">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-5">
          <InputField
            name="patientName"
            label="Full Name"
            value={formData.patientName}
            onChange={handleChange}
          />
          <InputField
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            type="email"
          />
          <InputField
            name="age"
            label="Age"
            value={formData.age}
            onChange={handleChange}
            type="number"
          />
          <InputField
            name="contactNumber"
            label="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
          />
          <InputField
            name="accountNumber"
            label="Account Number"
            value={formData.accountNumber}
            onChange={handleChange}
          />
          <InputField
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <InputField
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          {/* Gender Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] outline-none"
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign Employee
            </label>
            <select
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] outline-none"
              required
            >
              <option value="" disabled>
                Select an employee
              </option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp.employeeId}>
                  {`${emp.employeeId} - ${emp.fullName}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Laboratory Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Laboratory
            </label>
            <select
              name="labortary"
              value={formData.labortary || ""}
              onChange={(e) => {
                const selectedValue = e.target.value;

                const selectedLab = laboratories.find(
                  (lab) => lab._id === selectedValue
                );

                if (selectedLab) {
                  // From DB
                  setFormData((prev) => ({
                    ...prev,
                    laboratoryId: selectedLab._id,
                    labortary: selectedLab.fullName,
                  }));
                } else {
                  // From static options
                  setFormData((prev) => ({
                    ...prev,
                    laboratoryId: "",
                    labortary: selectedValue,
                  }));
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] outline-none"
              required
            >
              <option value="" disabled>
                Select a laboratory
              </option>
              {laboratories.map((lab) => (
                <option key={lab._id} value={lab._id}>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority Level
            </label>
            <select
              name="priorityLevel"
              value={formData.priorityLevel}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] outline-none"
              required
            >
              <option value="" disabled>
                Select Priority Level
              </option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] outline-none"
              required
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <InputField
            name="fees"
            label="Fees"
            value={formData.fees}
            onChange={handleChange}
            type="number"
          />

          <InputField
            name="appointmentDateTime"
            label="Date & Time"
            type="datetime-local"
            value={formData.appointmentDateTime}
            onChange={handleChange}
          />
          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Instructions
            </label>
            <textarea
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
              rows={4}
              placeholder="Any instruction advised by the doctor before conducting test"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] outline-none"
            />
          </div>

          {/* Upload Documents & Preview */}
          <div className="space-y-4 mt-4">
            {/* Label */}
            <label className="block text-sm font-medium text-gray-700">
              Upload Documents
            </label>

            {/* File Upload Input */}
            <label className="relative flex items-center justify-center px-4 py-2 w-full md:w-fit bg-[#0077B610] text-[#0077B6] border border-[#0077B640] rounded-lg cursor-pointer hover:bg-[#0077B620] transition text-sm font-medium">
              <span>Select Documents</span>
              <input
                type="file"
                multiple
                onChange={handleDocumentChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>

            {/* Document Previews */}
            {documents && documents.length > 0 && (
              <div className="bg-gray-50 rounded-md p-3 border border-gray-200 shadow-sm">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Selected Files:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  {Array.from(documents).map((doc, index) => (
                    <li key={index}>{doc.name}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-6 py-2 bg-[#0077B6] text-white rounded-full hover:bg-[#0077B6] transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin h-5 w-5 border-b-2 border-white rounded-full"></span>
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PatientUploadForm;
