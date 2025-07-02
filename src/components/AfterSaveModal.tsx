import React, { useState } from 'react';
import AddPatientsModal from './AddPatientsModal';

interface NewModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const NewModal: React.FC<NewModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
 const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        // Overlay
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center">
            {/* Modal container */}
            <div className="bg-white rounded-lg shadow-lg max-w-5xl mt-20 w-full max-h-[90vh] overflow-y-auto p-6 relative">
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
                {/*<h2 className="text-xl font-semibold mb-6">Patient Information</h2>*/}

                {/* Main Content */}
                <div className="container mx-auto p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div>
                            {/* Upload Patient Picture */}
                            <div className="mb-4">
                                <label className="block font-semibold text-gray-700 text-sm mb-2">Upload Patient picture</label>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.021M2 13h9a3 3 0 0 1 0-6h-.021M16 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" />
                                    </label>
                                </div>
                            </div>

                            {/* Full Name */}
                            <div className="mb-4">
                                <label className="block font-semibold text-gray-700 text-sm mb-2">Full name</label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Patient 1: Alex Gabriel</label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Patient 2: Sarah Trever</label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Patient 3: Rosco James</label>
                                <button onClick={openModal} className="text-black text-sm flex items-center shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <span className="mr-1">+</span> Add another
                                </button>
                            </div>
                            <AddPatientsModal isOpen={isModalOpen} onClose={closeModal} />

                            {/* Email */}
                            <div className="mb-4">
                                <label className="block font-semibold text-gray-700 text-sm mb-2">Email</label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Patient 1: alexgabriel@gmail.com</label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Patient 2: sarahtrever@gmail.com</label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Patient 3: roscojames@hotmail.com</label>
                                <button onClick={openModal} className="text-black text-sm flex items-center shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <span className="mr-1">+</span> Add another
                                </button>
                            </div>

                            {/* Contact Number */}
                            <div className="mb-4">
                                <label className="block font-semibold text-gray-700 text-sm mb-2">Contact Number</label>
                                <input type="tel" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="+1 234 5467 890" />
                            </div>

                            {/* Address */}
                            <div className="mb-4">
                                <label className="block font-semibold text-gray-700 text-sm mb-2">Address</label>
                                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="57th Cross, Richmond Circle, Church Road, London" />
                            </div>

                            {/* Date of Birth */}
                            <div className="mb-4">
                                <label className="block font-semibold text-gray-700 text-sm mb-2">Date of Birth</label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Patient 1: 1997-01-27</label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Patient 2: 1997-01-27</label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Patient 3: 1997-01-27</label>
                                <button onClick={openModal} className="text-black text-sm flex items-center shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <span className="mr-1">+</span> Add another
                                </button>
                            </div>

                            {/* Gender */}
                            <div className="mb-4">
                                <label className="block font-semibold text-gray-700 text-sm mb-2">Gender</label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Patient 1: Male</label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Patient 2: Female</label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Patient 3: Female</label>
                                <button onClick={openModal} className="text-black text-sm flex items-center shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <span className="mr-1">+</span> Add another
                                </button>
                            </div>

                            {/* Assign Employee */}
                            <div className="mb-4">
                                <label className="block font-semibold text-gray-700 text-sm mb-2">Assign Employee</label>
                                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <option>Richard Fames</option>
                                </select>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div>
                            {/* Test Type */}
                            <div className="mb-4">
                                <label className="block font-semibold text-gray-700 text-sm mb-2">Test Type</label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Patient 1: Blood Test (CBC)</label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Patient 2: Blood Test (CBC)</label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Patient 3: Blood Test (CBC)</label>
                                <button onClick={openModal} className="text-black text-sm flex items-center shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <span className="mr-1">+</span> Add another
                                </button>
                            </div>

                            {/* Fees */}
                            <div className="mb-4">
                                <label className="block font-semibold text-gray-700 text-sm mb-2">Fees</label>
                                <input type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="$1,500" />
                            </div>

                            {/* Priority Level */}
                            <div className="mb-4">
                                <label className="block font-semibold text-gray-700 text-sm mb-2">Priority Level</label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Patient 1: Routine</label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Patient 2: Routine</label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Patient 3: Routine</label>
                                <button onClick={openModal} className="text-black text-sm flex items-center shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <span className="mr-1">+</span> Add another
                                </button>
                            </div>

                            {/* Date & Time */}
                            <div className="mb-4">
                                <label className="block font-semibold text-gray-700 text-sm mb-2">Date & Time</label>
                                <input type="datetime-local" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue="2024-07-24T10:00" />
                            </div>

                            {/* Status */}
                            <div className="mb-4">
                                <label className="block font-semibold text-gray-700 text-sm mb-2">Status</label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Patient 1: Sample Collected</label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Patient 2: Sample Collected</label>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Patient 3: Sample Collected</label>
                                <button onClick={openModal} className="text-black text-sm flex items-center shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <span className="mr-1">+</span> Add another
                                </button>
                            </div>

                            {/* Special Instruction */}
                            <div className="mb-4">
                                <label className="block font-semibold text-gray-700 text-sm mb-2">Special Instruction</label>
                                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows={3} placeholder="Any instruction advised by the doctor before conducting test" />
                            </div>

                            {/* Upload Documents */}
                            <div className="mb-4">
                                <label className="block font-semibold text-gray-700 text-sm mb-2">Upload Documents</label>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.021M2 13h9a3 3 0 0 1 0-6h-.021M16 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" />
                                    </label>
                                </div>
                            </div>
                            <button
                        type="submit"
                        className="px-8 py-2 bg-[#A7CDEA] rounded-3xl hover:bg-gray-400 transition"
                        >
                        Save
                    </button>
                        </div>
                    </div>

               
                </div>
            </div>
        </div>
    );
};

export default NewModal;
