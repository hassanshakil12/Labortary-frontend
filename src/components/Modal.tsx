import React, { useState } from 'react';
import NewModal from '../components/AfterSaveModal';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const numberOfPatients = 12;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);

    const handleSaveClick = () => {
        setIsNewModalOpen(true);
    };

    const closeNewModal = () => {
        setIsNewModalOpen(false);
    };

    return (
        // Overlay
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center bg-opacity-50">
            {/* Modal container */}
            <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full mt-20 max-h-[90vh] overflow-y-auto p-6 relative">
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

                {/* Modal title */}
                <h2 className="text-xl font-semibold mb-6">Add Patients</h2>

                {/* Patients form */}
                <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Array.from({ length: numberOfPatients }).map((_, index) => (
                            <div key={index} className="border p-4 rounded space-y-3">
                                <h3 className="font-medium text-lg">Patient {index + 1}</h3>

                                <div className='flex'>
                                    <label className="block font-semibold mb-1 mr-2">Test Type:</label>
                                    <div className="flex items-center space-x-4">
                                        <label className="flex items-center space-x-1 cursor-pointer">
                                            <input
                                                type="radio"
                                                id={`bloodTest-${index}`}
                                                name={`testType-${index}`}
                                                value="Blood Test"
                                                className="form-radio"
                                            />
                                            <span>Blood Test</span>
                                        </label>

                                        <label className="flex items-center space-x-1 cursor-pointer">
                                            <input
                                                type="radio"
                                                id={`kit-${index}`}
                                                name={`testType-${index}`}
                                                value="Kit"
                                                className="form-radio"
                                            />
                                            <span>Kit</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <select
                                        id={`selectTestType-${index}`}
                                        name={`selectTestType-${index}`}
                                        className="w-full border border-gray-300 rounded p-2"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            Select Test Type
                                        </option>
                                        <option value="type1">Type 1</option>
                                        <option value="type2">Type 2</option>
                                        <option value="type3">Type 3</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center space-x-4 mt-6">
                        <button
                            type="button"
                            className="px-8 py-2 bg-[#A7CDEA] rounded-3xl hover:bg-gray-400 transition"
                            onClick={() => alert('Add clicked')}
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
                </form>
            </div>
        </div>
    );
};

export default Modal;
