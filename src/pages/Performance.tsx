import React, { useState } from "react";

const dummyData = Array.from({ length: 12 }).map((_, index) => ({
    id: index,
    name: "Ryan Fridley",
    totalSales: "$25,000",
    activeOrders: index % 2 === 0 ? 5 : 3,
    performanceColor: index % 3 === 0 ? "bg-green-500" : "bg-red-500",
}));

const PerformancePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dummyData.map((user) => (
                <div
                    key={user.id}
                    className="bg-gray-100 rounded-lg shadow-lg p-4 border flex flex-col items-center space-y-3"
                >
                    {/* Avatar */}
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                        <img
                            src="./images/performance-png.png"
                            alt="avatar"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-semibold">{user.name}</h3>

                    {/* Stats */}
                    <p className="text-sm text-gray-700">
                        <strong>Total Sales:</strong> {user.totalSales}
                    </p>
                    <p className="text-sm text-gray-700">
                        <strong>Active Orders:</strong>{" "}
                        <span className={user.activeOrders === 5 ? "text-green-500" : "text-red-500"}>
                            {user.activeOrders}
                        </span>
                    </p>
                    <p className="text-sm text-gray-700 flex items-center gap-1">
                        <strong>Performance:</strong>{" "}
                        <span className={`w-3 h-3 rounded-full ${user.performanceColor}`}></span>
                    </p>

                    {/* Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-2 bg-black text-white text-sm px-6 py-1 rounded-3xl"
                    >
                        Details
                    </button>

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-white flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                                {/* Close Button */}
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* Modal Content */}
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 pb-3 border-b border-gray-200">
                                        <div className="w-26 h-26 rounded bg-blue-400 overflow-hidden border border-gray-300">
                                            <img
                                                src="./images/performance-png.png" 
                                                alt="Alex Vincent 3rd"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex">
                                            <div>
                                                <h2 className="text-xl font-bold">Alex Vincent</h2>
                                                <p className="text-sm text-gray-600">Employee ID: 1234567890</p>
                                            </div>
                                            <p className="text-2xl text-brown-300"> 3rd</p>
                                        </div>
                                    </div>



                                    <div className="flex justify-between">
                                      
                                        <div>
                                            <h3 className="font-semibold text-gray-800">Contact Information</h3>
                                            <div className="space-y-1 mt-2 text-sm">
                                                <p><span className="text-gray-600">Email:</span> alexvincent@gmail.com</p>
                                                <p><span className="text-gray-600">Phone:</span> +1 123 456 7890</p>
                                                <p><span className="text-gray-600">Address:</span> S25 E 68th street</p>
                                                <p><span className="text-gray-600"></span> New York, NY 10651-78 156-187-60</p>
                                            </div>
                                        </div>
                                        <div className="space-y-1 mt-2 text-sm">
                                            <h3 className="font-semibold text-gray-800">Other Information</h3>
                                            <p><span className="text-gray-600">Joined:</span> 2022-05-15</p>
                                            <p><span className="text-gray-600">Performance:</span> 85% <span className="text-green-500">●</span></p>
                                            <p><span className="text-gray-600">Total Sales MTD:</span> $88,000</p>
                                            <p><span className="text-gray-600">Total Orders This Month:</span> 22</p>
                                            <p><span className="text-gray-600">Active Orders:</span> 5</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-800">Basic Information</h3>
                                        <div className="space-y-1 mt-2 text-sm">
                                            <p><span className="text-gray-600">Gender:</span> Male</p>
                                            <p><span className="text-gray-600">Date of Birth:</span> 20 July, 1992</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>

    );
};

export default PerformancePage;
