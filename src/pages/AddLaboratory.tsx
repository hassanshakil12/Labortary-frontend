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
      } rounded-lg focus:ring-2 focus:ring-[#0077B6] outline-none`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const AddLaboratory: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    fullName: "",
    address: "",
    contactNumber: "",
    about: "",
    timings: [] as {
      day: string;
      time: string[];
    }[],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const addDayTiming = (day: string) => {
    if (formData.timings.find((d) => d.day === day)) return;

    setFormData((prev) => ({
      ...prev,
      timings: [...prev.timings, { day, time: [] }],
    }));
  };

  const removeDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      timings: prev.timings.filter((d) => d.day !== day),
    }));
  };

  const updateDayTime = (day: string, timeIndex: number, newTime: string) => {
    setFormData((prev) => ({
      ...prev,
      timings: prev.timings.map((d) =>
        d.day === day
          ? {
              ...d,
              time: d.time.map((t, i) => (i === timeIndex ? newTime : t)),
            }
          : d
      ),
    }));
  };

  const addTimeToDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      timings: prev.timings.map((d) =>
        d.day === day ? { ...d, time: [...d.time, ""] } : d
      ),
    }));
  };

  const removeTimeFromDay = (day: string, timeIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      timings: prev.timings.map((d) =>
        d.day === day
          ? { ...d, time: d.time.filter((_, i) => i !== timeIndex) }
          : d
      ),
    }));
  };

  const isValidTime = (time: string): boolean => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Matches HH:mm
    return regex.test(time.trim());
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const today = new Date();

    Object.entries(formData).forEach(([key, value]) => {
      let trimmedValue: string | undefined;
      if (typeof value === "string") {
        trimmedValue = value.trim();
      }

      if (typeof value === "string" && !trimmedValue && key !== "about") {
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

    if (formData.password && formData.password.trim().length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (!formData.timings || formData.timings.length === 0) {
      newErrors.timings = "At least one timing entry is required.";
    } else {
      for (const timing of formData.timings) {
        if (!timing.day || typeof timing.day !== "string") {
          newErrors.timings = "Each timing entry must have a valid day.";
          break;
        }

        if (!Array.isArray(timing.time) || timing.time.length === 0) {
          newErrors.timings = `Timing for ${timing.day} is required.`;
          break;
        }

        if (timing.time.length !== 2) {
          newErrors.timings = `Exactly 2 timings must be provided for ${timing.day}.`;
          break;
        }

        for (const t of timing.time) {
          if (!isValidTime(t)) {
            newErrors.timings = `Invalid timing entry for day: ${timing.day}`;
            break;
          }
        }
      }
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

  const convertToDate = (timeStr: string): Date => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return new Date(now); // or return now;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   if (!validate()) {
     if (errors.timings) {
       toast.error(errors.timings); // 👈 show toast for timing issue
     }
     return;
   }

    setLoading(true);
    const token = localStorage.getItem("userAuthToken");

    const payload = new FormData();

    const formattedTimings = formData.timings.map((entry) => ({
      day: entry.day,
      time: entry.time.map((t) => convertToDate(t)), // ⬅ convert time strings
    }));

    // Append basic fields (excluding timings)
    Object.entries(formData).forEach(([key, val]) => {
      if (key !== "timings") {
        payload.append(key, val as string);
      }
    });

    // Append timings in nested format
    formattedTimings.forEach((dayBlock, index) => {
      payload.append(`timings[${index}][day]`, dayBlock.day);
      dayBlock.time.forEach((t, i) => {
        payload.append(`timings[${index}][time][${i}]`, t.toISOString());
      });
    });

    if (imageFile) {
      payload.append("image", imageFile);
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/add-laboratory`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(data.message || "Laboratory added successfully!");

      // Reset form
      setFormData({
        email: "",
        username: "",
        password: "",
        fullName: "",
        address: "",
        contactNumber: "",
        about: "",
        timings: [],
      });
      setImageFile(null);
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to add laboratory";
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
            className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-[#0077B6] shadow-sm"
          />
        ) : (
          <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400 text-xs text-center">
            No Image
          </div>
        )}

        {/* Upload Button */}
        <label className="cursor-pointer inline-block px-4 py-2 bg-[#0076b625] text-[#0077B6] rounded-lg border border-[#0077B6] hover:bg-[#0076b640] transition">
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
            label="Email"
            name="email"
            value={formData.email}
            type="email"
            onChange={handleChange}
            error={errors.email}
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
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />
        </div>

        <div className="space-y-5">
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

          {/* Timings Section */}
          <div className="space-y-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Add Working Days and Timings
            </label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {weekDays.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => addDayTiming(day)}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    formData.timings.some((d) => d.day === day)
                      ? "bg-[#0077B6] text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {formData.timings.map(({ day, time }) => (
              <div
                key={day}
                className="border p-4 rounded-lg space-y-2 bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-[#0077B6]">{day}</h4>
                  <button
                    type="button"
                    className="text-sm text-red-600"
                    onClick={() => removeDay(day)}
                  >
                    Remove
                  </button>
                </div>

                {time.map((t, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input
                      type="time"
                      value={t}
                      onChange={(e) => updateDayTime(day, i, e.target.value)}
                      className="w-40 px-2 py-1 border border-gray-300 rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeTimeFromDay(day, i)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addTimeToDay(day)}
                  className="text-[#0077B6] text-sm"
                >
                  + Add Time
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] outline-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-center space-x-5 mt-6">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-[#0077B6] text-white rounded-full hover:bg-[#005f8f] transition"
        >
          {loading ? "Adding..." : "Add Laboratory"}
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
          onClick={() => {
            setFormData({
              email: "",
              username: "",
              password: "",
              fullName: "",
              address: "",
              contactNumber: "",
              about: "",
              timings: [] as {
                day: string;
                time: string[]; // time in ISO string format or HH:mm
              }[],
            });
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddLaboratory;
