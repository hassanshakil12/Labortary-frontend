import React from "react";

const OrderDetails = () => {
    return (
        <div className="space-y-6 font-sans">
            {/* First Order Card */}
            <div className="p-4 border border-gray-300 shadow-lg rounded-md">
                <div className="flex flex-row gap-6">
                    {/* First Column - Header and Details */}
                    <div className="flex-1">
                        <h1 className="text-xl font-bold mb-2">#S14267 Kebby Industries</h1>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                                <p><strong>Account Manager:</strong> Brandon Gerak</p>
                                <p><strong>SO #:</strong> S14267</p>
                                <p><strong>Customer:</strong> Kebby Industries</p>
                                <p><strong>Client PO:</strong> 600758</p>
                                <p><strong>Part Number:</strong> HCP-250-SS</p>
                            </div>
                        </div>
                    </div>

                    {/* Second Column - Quantity Details */}
                    <div className="flex-1">
                        <div className="mt-8"> {/* Added margin to align with first column content */}
                            <p><strong>Quantity EA:</strong> 650</p>
                            <p><strong>Price EA $:</strong> $2.25</p>
                            <p><strong>Total Revenue:</strong> $1,462.50</p>
                            <p><strong>Due Date:</strong> 1/29/2025</p>
                        </div>
                    </div>

                    {/* Third Column - Product Image */}
                    <div className="flex-1">
                        <p className="mb-2"><strong>Picture of the product (if any)</strong></p>
                        <div className="bg-gray-100 rounded-md p-4 h-32 flex items-center justify-center border border-gray-200">
                            <span className="text-gray-400">Image placeholder</span>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-300 pt-4 mt-4">
                    {/* Progress line with checkboxes and tracking input */}
                    <div className="relative">
                        {/* Gray background line */}
                        <div className="absolute left-0 right-0 top-3 h-1 bg-gray-200 z-0"></div>

                        {/* Progress steps */}
                        <div className="relative flex justify-between items-start z-10">
                            {/* Completed steps (green circles with checkmarks) */}
                            {['Material Received', 'Production Started', 'Inspection Started', 'Shipping Started', 'Completed'].map((step, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <div className="w-6 h-6 rounded-full bg-green-500 border-4 border-white flex items-center justify-center mb-1">
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-xs text-gray-600 text-center">{step}</span>
                                </div>
                            ))}

                            {/* Tracking number section (in the same row) */}
                            <div className="flex flex-col items-center">
                                <div className="w-6 h-6 rounded-full bg-white border-4 border-green-500 mb-1"></div>
                                <div className="flex items-center">
                                    <span className="text-xs text-gray-600 mr-2">Enter Tracking Number</span>
                                    <input
                                        type="text"
                                        placeholder="#"
                                        className="border border-gray-300 rounded px-2 py-1 text-xs w-20"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Order Card (duplicate) */}
            <div className="p-4 border border-gray-300 shadow-lg rounded-md">
                <div className="flex flex-row gap-6">
                    {/* First Column - Header and Details */}
                    <div className="flex-1">
                        <h1 className="text-xl font-bold mb-2">#S14267 Kebby Industries</h1>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                                <p><strong>Account Manager:</strong> Brandon Gerak</p>
                                <p><strong>SO #:</strong> S14267</p>
                                <p><strong>Customer:</strong> Kebby Industries</p>
                                <p><strong>Client PO:</strong> 600758</p>
                                <p><strong>Part Number:</strong> HCP-250-SS</p>
                            </div>
                        </div>
                    </div>

                    {/* Second Column - Quantity Details */}
                    <div className="flex-1">
                        <div className="mt-8"> {/* Added margin to align with first column content */}
                            <p><strong>Quantity EA:</strong> 650</p>
                            <p><strong>Price EA $:</strong> $2.25</p>
                            <p><strong>Total Revenue:</strong> $1,462.50</p>
                            <p><strong>Due Date:</strong> 1/29/2025</p>
                        </div>
                    </div>

                    {/* Third Column - Product Image */}
                    <div className="flex-1">
                        <p className="mb-2"><strong>Picture of the product (if any)</strong></p>
                        <div className="bg-gray-100 rounded-md p-4 h-32 flex items-center justify-center border border-gray-200">
                            <span className="text-gray-400">Image placeholder</span>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-300 pt-4 mt-4">
                    {/* Progress line with checkboxes and tracking input */}
                    <div className="relative">
                        {/* Gray background line */}
                        <div className="absolute left-0 right-0 top-3 h-1 bg-gray-200 z-0"></div>

                        {/* Progress steps */}
                        <div className="relative flex justify-between items-start z-10">
                            {/* Completed steps (green circles with checkmarks) */}
                            {['Material Received', 'Production Started', 'Inspection Started', 'Shipping Started', 'Completed'].map((step, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <div className="w-6 h-6 rounded-full bg-green-500 border-4 border-white flex items-center justify-center mb-1">
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-xs text-gray-600 text-center">{step}</span>
                                </div>
                            ))}

                            {/* Tracking number section (in the same row) */}
                            <div className="flex flex-col items-center">
                                <div className="w-6 h-6 rounded-full bg-white border-4 border-green-500 mb-1"></div>
                                <div className="flex items-center">
                                    <span className="text-xs text-gray-600 mr-2">Enter Tracking Number</span>
                                    <input
                                        type="text"
                                        placeholder="#"
                                        className="border border-gray-300 rounded px-2 py-1 text-xs w-20"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default OrderDetails;