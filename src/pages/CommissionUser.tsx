const CommissionUser = () => {
    const transactionData = [
        {
            so: "S14267",
            customer: "Kebby Industries",
            date: "21 Apr, 2024–03:23 pm",
            amount: "$10,000",
            status: "Received",
        },
        {
            so: "S14267",
            customer: "Kebby Industries",
            date: "21 Apr, 2024–03:23 pm",
            amount: "$10,000",
            status: "Received",
        },
        {
            so: "S14267",
            customer: "Kebby Industries",
            date: "21 Apr, 2024–03:23 pm",
            amount: "$10,000",
            status: "Received",
        },
        {
            so: "S14267",
            customer: "Kebby Industries",
            date: "21 Apr, 2024–03:23 pm",
            amount: "$10,000",
            status: "Pending",
        },
        {
            so: "S14267",
            customer: "Kebby Industries",
            date: "21 Apr, 2024–03:23 pm",
            amount: "$10,000",
            status: "Pending",
        },
        {
            so: "S14267",
            customer: "Kebby Industries",
            date: "21 Apr, 2024–03:23 pm",
            amount: "$10,000",
            status: "Received",
        },
        {
            so: "S14267",
            customer: "Kebby Industries",
            date: "21 Apr, 2024–03:23 pm",
            amount: "$10,000",
            status: "Received",
        },
        {
            so: "S14267",
            customer: "Kebby Industries",
            date: "21 Apr, 2024–03:23 pm",
            amount: "$10,000",
            status: "Received",
        },
        {
            so: "S14267",
            customer: "Kebby Industries",
            date: "21 Apr, 2024–03:23 pm",
            amount: "$10,000",
            status: "Received",
        },
    ];

    return (
        <div className="p-4 bg-white rounded-lg shadow-md border border-gray-300 max-w-6xl mx-auto">
            {/* Top section */}
            <div className="flex flex-col md:flex-row justify-start gap-4 mb-6">
                {/* Total Earning Card */}
                <div className="bg-white border rounded-md shadow-sm p-4 w-[220px]">
                    <div className="flex justify-between items-start">
                        {/* Icon */}
                        <img
                                src="./images/dollar-sign-icon.png"
                                alt="dollar"
                                className="w-15 items-center h-15 mt-1"
                            />
                        {/* Text */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-1">Total Earning</h3>
                            <p className="text-2xl font-bold">$60,000</p>
                            <p className="text-sm text-gray-500">1% Commission</p>
                        </div>
                    </div>
                </div>

                {/* Recent Payment Card */}
                <div className="bg-white border rounded-md shadow-sm p-4 w-[350px]">
                    <div className="">
                        {/* Title */}
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Recent Payment</h3>

                        {/* Content Row */}
                        <div className="flex items-start mt-4 gap-2">
                            {/* Icon */}
                            <img
                                src="./images/paypal-icon.png"
                                alt="PayPal"
                                className="w-6 h-6 mt-1"
                            />

                            {/* Info Section */}
                            <div className="flex flex-col">
                                <p className="text-sm font-medium">PayPal</p>
                                <p className="text-sm font-medium">Kebby Industries</p>
                            </div>

                            <div className="flex flex-col ms-8 mt-2">
                                <p className="text-xs text-gray-500">
                                    <strong>Account Number</strong> <br />
                                    123********78
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>


            {/* Transaction History */}
            <h2 className="text-lg font-semibold mb-2">Transaction History</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 border-b">
                            <th className="py-2 px-4 text-left">SO #</th>
                            <th className="py-2 px-4 text-left">Customer Name</th>
                            <th className="py-2 px-4 text-left">Date & Time</th>
                            <th className="py-2 px-4 text-left">Amount</th>
                            <th className="py-2 px-4 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionData.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 px-4">{item.so}</td>
                                <td className="py-2 px-4">{item.customer}</td>
                                <td className="py-2 px-4">{item.date}</td>
                                <td className="py-2 px-4">{item.amount}</td>
                                <td className="py-2 px-4 font-semibold text-black">{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CommissionUser;
