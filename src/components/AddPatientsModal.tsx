import React, { useState } from 'react';
import NewModal from './AfterSaveModal';

interface AnotherModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AnotherModal: React.FC<AnotherModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
 const [isNewModalOpen, setIsNewModalOpen] = useState(false);

    const handleSaveClick = () => {
        setIsNewModalOpen(true);
    };

    const closeNewModal = () => {
        setIsNewModalOpen(false);
    };
    const numberOfPatients = 12;

    return (
        // Overlay
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs">
            {/* Modal container */}
            <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full mt-20 max-h-[90vh] overflow-y-auto p-6 relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Modal Content */}
                <div className="container mx-auto p-4">
                    <div className="grid grid-cols-2 gap-4">
                        {Array.from({ length: numberOfPatients }).map((_, index) => (
                            <div key={index} className="mb-2">
                                <label className="block font-semibold text-gray-700 text-sm mb-2">
                                    Patient {index + 1}
                                </label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        className="shadow appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                                        placeholder={`Patient ${index + 1}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center space-x-4 mt-6">
                        <button
                            type="button"
                            className="px-8 py-2 bg-[#A7CDEA] rounded-3xl hover:bg-gray-400 transition"
                            >
                            Add
                        </button>
                        <button
                            type="button"
                            className="px-8 py-2 bg-[#A7CDEA] rounded-3xl hover:bg-blue-700 transition"
                            onClick={handleSaveClick}
                        >
                            Save
                        </button>
                        <NewModal isOpen={isNewModalOpen} onClose={closeNewModal} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnotherModal;
