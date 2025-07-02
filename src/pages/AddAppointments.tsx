import React, { useState } from "react";
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
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>
);

const PatientUploadForm: React.FC = () => {
  const [formData, setFormData] = useState({
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
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [documents, setDocuments] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

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
            className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-blue-500 shadow-sm"
          />
        ) : (
          <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400 text-xs text-center">
            No Image
          </div>
        )}

        {/* Upload Button */}
        <label className="cursor-pointer inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-lg border border-blue-300 hover:bg-blue-200 transition">
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
            name="contactNumber"
            label="Contact Number"
            value={formData.contactNumber}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Other</option>
            </select>
          </div>
          <InputField
            name="employeeId"
            label="Assign Employee ID"
            value={formData.employeeId}
            onChange={handleChange}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Laboratory Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Laboratory
            </label>
            <select
              name="labortary"
              value={formData.labortary}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="" disabled>
                Select Laboratory
              </option>
              <option value="XYZ Lab">XYZ Lab</option>
              <option value="ABC Diagnostic">ABC Diagnostic</option>
              <option value="HealthCare Clinic">HealthCare Clinic</option>
              <option value="MedTest Center">MedTest Center</option>
            </select>
          </div>

          <InputField
            name="fees"
            label="Fees"
            value={formData.fees}
            onChange={handleChange}
          />
          <InputField
            name="priorityLevel"
            label="Priority Level"
            value={formData.priorityLevel}
            onChange={handleChange}
          />
          <InputField
            name="appointmentDateTime"
            label="Date & Time"
            type="datetime-local"
            value={formData.appointmentDateTime}
            onChange={handleChange}
          />
          <InputField
            name="status"
            label="Status"
            value={formData.status}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Upload Documents & Preview */}
          <div className="space-y-4 mt-4">
            {/* Label */}
            <label className="block text-sm font-medium text-gray-700">
              Upload Documents
            </label>

            {/* File Upload Input */}
            <label className="relative flex items-center justify-center px-4 py-2 w-full md:w-fit bg-blue-50 text-blue-700 border border-blue-300 rounded-lg cursor-pointer hover:bg-blue-100 transition text-sm font-medium">
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
              className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
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
