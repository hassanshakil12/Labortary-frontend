import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  error,
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
      className={`w-full px-4 py-2 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-lg focus:ring-2 focus:ring-blue-500 outline-none`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const AddEmployee: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    address: "",
    hireDate: "",
    employeeId: "",
    username: "",
    password: "",
    jobRole: "",
    shiftTiming: "",
    about: "",
    gender: "",
    department: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const today = new Date();

    Object.entries(formData).forEach(([key, value]) => {
      const trimmedValue = value.trim();

      if (!trimmedValue && key !== "about") {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required`;
      }
    });

    if (formData.email && !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Invalid email format";
    }

    if (
      formData.contactNumber &&
      !phoneRegex.test(formData.contactNumber.trim())
    ) {
      newErrors.contactNumber = "Invalid contact number format";
    }

    if (
      formData.address.trim().length > 0 &&
      formData.address.trim().length < 5
    ) {
      newErrors.address = "Address must be at least 5 characters long";
    }

    const hireDate = new Date(formData.hireDate);
    if (formData.hireDate && (isNaN(hireDate.getTime()) || hireDate > today)) {
      newErrors.hireDate = "Hire date must be valid and not in the future";
    }

    if (formData.password && formData.password.trim().length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    const validGenders = ["Male", "Female", "Other"];
    if (formData.gender && !validGenders.includes(formData.gender)) {
      newErrors.gender = "Invalid gender selected";
    }

    const validDepartments = ["Laboratory", "Radiology", "Pharmacy", "Admin"];
    if (
      formData.department &&
      !validDepartments.includes(formData.department)
    ) {
      newErrors.department = "Invalid department selected";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file)
      if (file) {
        setImageFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImagePreviewUrl(imageUrl);
      }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const token = localStorage.getItem("userAuthToken");

    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => payload.append(key, val));
    if (imageFile) payload.append("image", imageFile);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/add-employee`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(data.message || "Employee added successfully!");
      setFormData({
        fullName: "",
        email: "",
        contactNumber: "",
        address: "",
        hireDate: "",
        employeeId: "",
        username: "",
        password: "",
        jobRole: "",
        shiftTiming: "",
        about: "",
        gender: "",
        department: "",
      });
      setImageFile(null);
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to add employee";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl space-y-8"
    >
      {/* Upload Section */}
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
        <div className="space-y-5">
          <InputField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />
          <InputField
            label="Email"
            name="email"
            value={formData.email}
            type="email"
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            type="tel"
            onChange={handleChange}
            error={errors.contactNumber}
          />
          <InputField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
          />
          <InputField
            label="Hire Date"
            name="hireDate"
            value={formData.hireDate}
            type="date"
            onChange={handleChange}
            error={errors.hireDate}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.department ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 outline-none`}
            >
              <option value="" disabled>
                Select Department
              </option>
              <option value="Laboratory">Laboratory</option>
              <option value="Radiology">Radiology</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Admin">Admin</option>
            </select>
            {errors.department && (
              <p className="text-red-500 text-xs mt-1">{errors.department}</p>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <InputField
            label="Employee ID"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            error={errors.employeeId}
          />
          <InputField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />
          <InputField
            label="Password"
            name="password"
            value={formData.password}
            type="password"
            onChange={handleChange}
            error={errors.password}
          />
          <InputField
            label="Job Role"
            name="jobRole"
            value={formData.jobRole}
            onChange={handleChange}
            error={errors.jobRole}
          />

          {/* Shift Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shift
            </label>
            <select
              name="shiftTiming"
              value={formData.shiftTiming}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.shiftTiming ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 outline-none`}
            >
              <option value="" disabled>
                Select Shift
              </option>
              <option value="Morning">Morning (8AM - 4PM)</option>
              <option value="Evening">Evening (4PM - 12AM)</option>
              <option value="Night">Night (12AM - 8AM)</option>
              <option value="Custom">Custom</option>
            </select>
            {errors.shiftTiming && (
              <p className="text-red-500 text-xs mt-1">{errors.shiftTiming}</p>
            )}
          </div>

          {/* Gender Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.gender ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 outline-none`}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
            )}
          </div>
        </div>
      </div>

      {/* About */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          About
        </label>
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          rows={4}
          placeholder="Write something about the employee..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-center space-x-5 mt-6">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          {loading ? "Adding..." : "Add Employee"}
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
          onClick={() => {
            setFormData({
              fullName: "",
              email: "",
              contactNumber: "",
              address: "",
              hireDate: "",
              employeeId: "",
              username: "",
              password: "",
              jobRole: "",
              shiftTiming: "",
              about: "",
              gender: "",
              department: "",
            });
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddEmployee;
