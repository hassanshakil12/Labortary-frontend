import React from "react";

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditMode: boolean;
  onEdit: () => void;
  onSave: () => void;
}

const PatientModal: React.FC<PatientModalProps> = ({
  isOpen,
  onClose,
  isEditMode,
  onEdit,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-30">
      <div className="relative bg-white rounded-2xl p-8 w-full max-w-3xl shadow-lg">
        {/* Close button */}
        <button
          className="absolute top-6 right-6 text-4xl font-bold text-black hover:text-gray-600"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Header */}
        <div className="flex items-center mb-6">
          <img
            src="./images/performance-png.png"
            alt="Avatar"
            className="w-16 h-16 rounded-full bg-blue-100 border-4 border-blue-200 mr-4"
          />
          <h2 className="text-2xl font-bold text-black">Alex William</h2>
        </div>

        {/* Info Sections */}
        <div className="flex justify-between mb-8">
          {/* Basic Information */}
          <div className="text-start">
            <h3 className="font-semibold text-[#1D8CBC] mb-2 text-base underline underline-offset-4">Basic Information</h3>
            <div className="text-sm space-y-1">
              <div>Email: alexwilliam@gmail.com</div>
              <div>Contact Number: +1 234 567 890</div>
              <div>
                Address: 525 E 68th street<br />
                New York, NY 10651-78<br />
                156-187-60
              </div>
              <div>Date of Birth: 12 July, 1996</div>
              <div>Gender: Male</div>
            </div>
          </div>
          {/* Other Information */}
          <div className="text-start">
            <h3 className="font-semibold text-[#1D8CBC] mb-2 text-base underline underline-offset-4">Other Information</h3>
            <div className="text-sm space-y-1">
              <div>Priority Level: Urgent</div>
              <div>Assigned Employee: Richard James</div>
              <div>Test Type: Blood Test (CBC)</div>
              <div>Date &amp; Time: 24th July, 2024, 10:00AM</div>
              <div>Status: Blood Sample Received</div>
              <div>Fees: $150</div>
              <div>Special Instruction: -</div>
            </div>
          </div>
        </div>

        {/* Prescription/Document Images */}
        <div className="flex gap-8 mb-8">
          <div className="flex-1 bg-gray-100 h-40 flex items-center justify-center text-center text-black font-semibold rounded-md">
            Relevant prescription/<br />Document images (if any)
          </div>
          <div className="flex-1 bg-gray-100 h-40 flex items-center justify-center text-center text-black font-semibold rounded-md">
            Relevant prescription/<br />Document images (if any)
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6">
          {!isEditMode ? (
            <button
              className="bg-[#BFE7FF] text-black px-12 py-2 rounded-full font-semibold text-lg"
              onClick={onEdit}
            >
              Edit
            </button>
          ) : (
            <button
              className="bg-[#BFE7FF] text-black px-12 py-2 rounded-full font-semibold text-lg"
              onClick={onSave}
            >
              Save
            </button>
          )}
          <button
            className="bg-[#BFE7FF] text-black px-12 py-2 rounded-full font-semibold text-lg"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;
