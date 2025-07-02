// import React from "react";

// // Status color mapping
// const statusStyles = {
//   Completed: "text-green-500 font-bold",
//   Pending: "text-yellow-500 font-bold",
//   Denied: "text-red-500 font-bold",
// };

// const transactions = [
//   {
//     account: "123********78",
//     name: "Alex Gabriel",
//     date: "21 Apr, 2024-03:23 pm",
//     amount: "$10,000",
//     status: "Completed",
//   },
//   {
//     account: "123********78",
//     name: "Alex Gabriel",
//     date: "21 Apr, 2024-03:23 pm",
//     amount: "$10,000",
//     status: "Completed",
//   },
//   {
//     account: "123********78",
//     name: "Thomas Shelby",
//     date: "21 Apr, 2024-03:23 pm",
//     amount: "$10,000",
//     status: "Pending",
//   },
//   {
//     account: "123********78",
//     name: "Emma stones",
//     date: "21 Apr, 2024-03:23 pm",
//     amount: "$10,000",
//     status: "Completed",
//   },
//   {
//     account: "123********78",
//     name: "Peter Parker",
//     date: "21 Apr, 2024-03:23 pm",
//     amount: "$10,000",
//     status: "Completed",
//   },
//   {
//     account: "123********78",
//     name: "Ana De Armas",
//     date: "21 Apr, 2024-03:23 pm",
//     amount: "$10,000",
//     status: "Denied",
//   },
//   {
//     account: "123********78",
//     name: "Ana De Armas",
//     date: "21 Apr, 2024-03:23 pm",
//     amount: "$10,000",
//     status: "Completed",
//   },
//   {
//     account: "123********78",
//     name: "Ana De Armas",
//     date: "21 Apr, 2024-03:23 pm",
//     amount: "$10,000",
//     status: "Completed",
//   },
// ];

// export default function Dashboard() {
//   return (
//     <div className="bg-blue-50 min-h-screen p-4 md:p-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         {/* Total Amount Card */}
//         <div className="bg-white rounded-lg shadow p-4 md:p-6">
//           <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//             {/* Left: Icon and Total Amount */}
//             <div className="flex items-center">
//               <div className="bg-blue-100 p-3 rounded-full mr-4">
//                 <span className="text-3xl font-bold text-blue-500">$</span>
//               </div>
//               <div>
//                 <div className="text-lg font-bold">Total Amount</div>
//                 <div className="text-2xl font-semibold">$ 1,25,000</div>
//               </div>
//             </div>
//             {/* Right: Action Buttons */}
//             <div className="flex flex-wrap md:flex-nowrap space-x-2 space-y-2 md:space-y-0">
//               <button className="bg-[#C9E8FF] text-black px-4 py-1 rounded hover:bg-blue-600 text-sm">
//                 + Topup
//               </button>
//               <button className="bg-[#C9E8FF] text-black px-4 py-1 rounded hover:bg-blue-600 text-sm">
//                 + Transfer
//               </button>
//               <button className="bg-[#C9E8FF] text-black px-4 py-1 rounded hover:bg-blue-600 text-sm">
//                 + Statements
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Recent Transaction Card */}
//         <div className="bg-white rounded-lg shadow p-4 md:p-6 flex flex-col justify-between">
//           <div className="text-lg font-bold mb-4">Recent Transaction</div>
//           <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
//             <div className="bg-blue-100 p-2 rounded">
//               <svg
//                 className="w-8 h-8 text-blue-600"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M21.8 8.6c-.3-2.2-2.1-3.6-5.1-3.6h-8c-.5 0-.9.3-1 .8l-2.6 14.2c-.1.4.2.8.6.8h3.4l.7-4h2.5c4.2 0 6.7-2.1 7.3-6.2.1-.5.1-1 .1-1.4 0-.2 0-.4-.1-.6zm-2.6 2.7c-.5 3-2.5 4.4-6 4.4h-2.2l1.4-7.7h5.2c2.3 0 3.5.7 3.8 2.2.1.3.1.7 0 1.1 0 .4-.1.7-.2 1zm-9.6 9.2h-2.1l2.3-12.4c.1-.4.4-.7.8-.7h7.6c2.6 0 4.1 1.2 4.4 3.3.1.6.1 1.1 0 1.6-.6 4.2-3.1 6.2-7.7 6.2h-2.5l-.7 4z" />
//               </svg>
//             </div>
//             <div className="flex flex-col sm:flex-row sm:justify-between w-full">
//               <div>
//                 <div className="text-md font-semibold">PayPal</div>
//                 <div className="text-sm text-gray-500">Alex Gabriel</div>
//               </div>
//               <div className="mt-2 sm:mt-0 sm:text-right">
//                 <div className="text-xs text-gray-500">Account Number</div>
//                 <div className="font-semibold">123********78</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Transaction History Table */}
//       <div className="bg-white rounded-lg shadow p-4 md:p-6">
//         <div className="text-xl font-bold mb-4">Transaction History</div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-left">
//             <thead>
//               <tr className="bg-blue-100">
//                 <th className="px-4 py-2 font-semibold">Account Number</th>
//                 <th className="px-4 py-2 font-semibold">Name</th>
//                 <th className="px-4 py-2 font-semibold">Date & Time</th>
//                 <th className="px-4 py-2 font-semibold">Amount</th>
//                 <th className="px-4 py-2 font-semibold">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.map((tx, idx) => (
//                 <tr key={idx} className="border-b last:border-b-0">
//                   <td className="px-4 py-2">{tx.account}</td>
//                   <td className="px-4 py-2">{tx.name}</td>
//                   <td className="px-4 py-2">{tx.date}</td>
//                   <td className="px-4 py-2">{tx.amount}</td>
//                   <td className="px-4 py-2">
//                     {/* <span className={`${statusStyles[tx.status]}`}>{tx.status}</span> */}
//                     <span
//                       className={`${
//                         statusStyles[tx.status as keyof typeof statusStyles]
//                       }`}
//                     >
//                       {tx.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
// ======================================================================================================
// import React from "react";

// const statusStyles = {
//   Completed:
//     "text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium",
//   Pending:
//     "text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium",
//   Denied: "text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-medium",
// };

// const transactions = [
//   {
//     account: "123********78",
//     name: "Alex Gabriel",
//     date: "21 Apr, 2024 - 03:23 pm",
//     amount: "$10,000",
//     status: "Completed",
//   },
//   {
//     account: "123********78",
//     name: "Thomas Shelby",
//     date: "21 Apr, 2024 - 03:23 pm",
//     amount: "$10,000",
//     status: "Pending",
//   },
//   {
//     account: "123********78",
//     name: "Emma Stones",
//     date: "21 Apr, 2024 - 03:23 pm",
//     amount: "$10,000",
//     status: "Completed",
//   },
//   {
//     account: "123********78",
//     name: "Peter Parker",
//     date: "21 Apr, 2024 - 03:23 pm",
//     amount: "$10,000",
//     status: "Completed",
//   },
//   {
//     account: "123********78",
//     name: "Ana De Armas",
//     date: "21 Apr, 2024 - 03:23 pm",
//     amount: "$10,000",
//     status: "Denied",
//   },
// ];

// export default function Dashboard() {
//   return (
//     <div className="bg-blue-50 min-h-screen space-y-6">
//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-4">
//               <div className="bg-blue-100 p-3 rounded-full">
//                 <span className="text-2xl font-bold text-blue-600">$</span>
//               </div>
//               <div>
//                 <p className="text-gray-600 font-medium">Total Amount</p>
//                 <h2 className="text-2xl font-bold text-gray-800">$125,000</h2>
//               </div>
//             </div>
//             <div className="flex space-x-2">
//               <button className="bg-blue-100 hover:bg-blue-200 text-sm text-blue-700 font-medium px-4 py-1 rounded-full">
//                 + Topup
//               </button>
//               <button className="bg-blue-100 hover:bg-blue-200 text-sm text-blue-700 font-medium px-4 py-1 rounded-full">
//                 + Transfer
//               </button>
//               <button className="bg-blue-100 hover:bg-blue-200 text-sm text-blue-700 font-medium px-4 py-1 rounded-full">
//                 + Statements
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white shadow-md rounded-xl p-6">
//           <h3 className="text-lg font-bold mb-4">Recent Transaction</h3>
//           <div className="flex items-center space-x-4">
//             <div className="bg-blue-100 p-3 rounded-full">
//               <svg
//                 className="w-8 h-8 text-blue-600"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M21.8 8.6c-.3-2.2-2.1-3.6-5.1-3.6h-8c-.5 0-.9.3-1 .8l-2.6 14.2c-.1.4.2.8.6.8h3.4l.7-4h2.5c4.2 0 6.7-2.1 7.3-6.2.1-.5.1-1 .1-1.4 0-.2 0-.4-.1-.6zm-2.6 2.7c-.5 3-2.5 4.4-6 4.4h-2.2l1.4-7.7h5.2c2.3 0 3.5.7 3.8 2.2.1.3.1.7 0 1.1 0 .4-.1.7-.2 1zm-9.6 9.2h-2.1l2.3-12.4c.1-.4.4-.7.8-.7h7.6c2.6 0 4.1 1.2 4.4 3.3.1.6.1 1.1 0 1.6-.6 4.2-3.1 6.2-7.7 6.2h-2.5l-.7 4z" />
//               </svg>
//             </div>
//             <div className="flex justify-between w-full">
//               <div>
//                 <p className="font-medium text-gray-700">PayPal</p>
//                 <p className="text-sm text-gray-500">Alex Gabriel</p>
//               </div>
//               <div className="text-right">
//                 <p className="text-xs text-gray-400">Account Number</p>
//                 <p className="font-semibold">123********78</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Transaction Table */}
//       <div className="bg-white shadow-md rounded-xl p-6">
//         <h3 className="text-xl font-bold mb-4">Transaction History</h3>
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm text-left">
//             <thead className="bg-blue-100 text-gray-700">
//               <tr>
//                 <th className="px-4 py-2 font-semibold">Account</th>
//                 <th className="px-4 py-2 font-semibold">Name</th>
//                 <th className="px-4 py-2 font-semibold">Date & Time</th>
//                 <th className="px-4 py-2 font-semibold">Amount</th>
//                 <th className="px-4 py-2 font-semibold">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.map((tx, idx) => (
//                 <tr
//                   key={idx}
//                   className="border-b last:border-b-0 hover:bg-blue-50"
//                 >
//                   <td className="px-4 py-2 whitespace-nowrap">{tx.account}</td>
//                   <td className="px-4 py-2 whitespace-nowrap">{tx.name}</td>
//                   <td className="px-4 py-2 whitespace-nowrap">{tx.date}</td>
//                   <td className="px-4 py-2 whitespace-nowrap">{tx.amount}</td>
//                   <td className="px-4 py-2">
//                     <span
//                       className={`${
//                         statusStyles[tx.status as keyof typeof statusStyles]
//                       }`}
//                     >
//                       {tx.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";

const statusOptions = ["Completed", "Pending", "Denied"];

const statusStyles = {
  Completed:
    "text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium",
  Pending:
    "text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium",
  Denied: "text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-medium",
};

const transactions = [
  {
    account: "123********78",
    name: "Alex Gabriel",
    date: "21 Apr, 2024 - 03:23 pm",
    amount: "$10,000",
    status: "Completed",
  },
  {
    account: "123********78",
    name: "Thomas Shelby",
    date: "21 Apr, 2024 - 03:23 pm",
    amount: "$10,000",
    status: "Pending",
  },
  {
    account: "123********78",
    name: "Emma Stones",
    date: "21 Apr, 2024 - 03:23 pm",
    amount: "$10,000",
    status: "Completed",
  },
  {
    account: "123********78",
    name: "Peter Parker",
    date: "21 Apr, 2024 - 03:23 pm",
    amount: "$10,000",
    status: "Completed",
  },
  {
    account: "123********78",
    name: "Ana De Armas",
    date: "21 Apr, 2024 - 03:23 pm",
    amount: "$10,000",
    status: "Denied",
  },
];

export default function Dashboard() {
  const [statusMap, setStatusMap] = useState(
    transactions.reduce((acc, tx, idx) => {
      acc[idx] = tx.status;
      return acc;
    }, {} as { [key: number]: string })
  );

  const handleStatusChange = (index: number, newStatus: string) => {
    setStatusMap((prev) => ({ ...prev, [index]: newStatus }));
  };

  return (
    <div className="bg-blue-50 min-h-screen space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white text-blue-600 p-3 rounded-full">
                <span className="text-2xl font-bold">$</span>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">
                  Total Amount
                </p>
                <h2 className="text-3xl font-bold">$125,000</h2>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="bg-white text-blue-700 hover:bg-gray-100 text-sm font-semibold px-4 py-1.5 rounded-full">
              + Topup
            </button>
            <button className="bg-white text-blue-700 hover:bg-gray-100 text-sm font-semibold px-4 py-1.5 rounded-full">
              + Transfer
            </button>
            <button className="bg-white text-blue-700 hover:bg-gray-100 text-sm font-semibold px-4 py-1.5 rounded-full">
              + Statements
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4">Recent Transaction</h3>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21.8 8.6c-.3-2.2-2.1-3.6-5.1-3.6h-8c-.5 0-.9.3-1 .8l-2.6 14.2c-.1.4.2.8.6.8h3.4l.7-4h2.5c4.2 0 6.7-2.1 7.3-6.2.1-.5.1-1 .1-1.4 0-.2 0-.4-.1-.6zm-2.6 2.7c-.5 3-2.5 4.4-6 4.4h-2.2l1.4-7.7h5.2c2.3 0 3.5.7 3.8 2.2.1.3.1.7 0 1.1 0 .4-.1.7-.2 1zm-9.6 9.2h-2.1l2.3-12.4c.1-.4.4-.7.8-.7h7.6c2.6 0 4.1 1.2 4.4 3.3.1.6.1 1.1 0 1.6-.6 4.2-3.1 6.2-7.7 6.2h-2.5l-.7 4z" />
              </svg>
            </div>
            <div className="flex justify-between w-full">
              <div>
                <p className="font-medium text-gray-700">PayPal</p>
                <p className="text-sm text-gray-500">Alex Gabriel</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Account Number</p>
                <p className="font-semibold">123********78</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Transaction History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 font-semibold">Account</th>
                <th className="px-4 py-2 font-semibold">Name</th>
                <th className="px-4 py-2 font-semibold">Date & Time</th>
                <th className="px-4 py-2 font-semibold">Amount</th>
                <th className="px-4 py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr
                  key={idx}
                  className="border-b last:border-b-0 hover:bg-blue-50"
                >
                  <td className="px-4 py-2 whitespace-nowrap">{tx.account}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{tx.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{tx.date}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{tx.amount}</td>
                  <td className="px-4 py-2">
                    <select
                      className="border rounded-md text-xs px-2 py-1 bg-white"
                      value={statusMap[idx]}
                      onChange={(e) => handleStatusChange(idx, e.target.value)}
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
