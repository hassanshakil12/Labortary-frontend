import React from 'react';

const AddSalesmanForm = () => {
    return (
        <div className="max-w-xl p-4 bg-white shadow-lg">

            <div className="grid grid-cols-1 gap-4">
                <div className="flex">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300">
                    </div>
                    <span className="text-gray-500 ms-3 text-sm items-center flex ">Upload picture</span>

                </div>

                {/* Left Column Fields */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Full name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full px-3 py-2 border  rounded border-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="Salesman email"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Contact Number</label>
                            <input
                                type="tel"
                                placeholder="Contact Number"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Address</label>
                            <input
                                type="text"
                                placeholder="______"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Hire Date</label>
                            <input
                                type="text"
                                placeholder="______"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Right Column Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Employee ID</label>
                            <input
                                type="text"
                                placeholder="______"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Job Role</label>
                            <input
                                type="text"
                                placeholder="______"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Shift</label>
                            <input
                                type="text"
                                placeholder="______"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* About Section - Full Width */}
                <div>
                    <label className="block text-sm text-gray-700 mb-1">About</label>
                    <textarea
                        placeholder="Write about yourself"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                        rows={2}
                    />
                </div>

                <div className="flex justify-center space-x-3 pt-6">
                    <button className="px-4 py-2 bg-gray-100 text-black rounded-2xl">
                        Add Salesman
                    </button>
                    <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-2xl">
                        Cancel
                    </button>

                </div>
            </div>
        </div>
    );
};

export default AddSalesmanForm;