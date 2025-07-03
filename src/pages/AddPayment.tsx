import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const statusOptions = ["Completed", "Pending", "Denied"];

const statusStyles = {
  Completed:
    "text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium",
  Pending:
    "text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium",
  Denied: "text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-medium",
};

export default function Dashboard() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [statusMap, setStatusMap] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [totalEarnings, setTotalEarnings] = useState<number | null>(null);
  const [recentTransaction, setRecentTransaction] = useState<any>(null);

  const token = localStorage.getItem("userAuthToken");

  const fetchTransactions = async () => {
    if (!token) {
      toast.error("Authentication token is missing.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/get-transactions`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const fetchedTransactions = data?.data || [];
      setTransactions(fetchedTransactions);

      const map: { [key: string]: string } = {};
      fetchedTransactions.forEach((tx: any) => {
        map[tx._id] = tx.status;
      });
      setStatusMap(map);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch transactions"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    if (!token) {
      toast.error("Authentication token is missing.");
      return;
    }

    try {
      setLoading(true);
      const [earningsRes, recentTxRes] = await Promise.all([
        axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/get-total-earning`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
        axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/v1/admin/get-recent-transaction`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
      ]);

      setTotalEarnings(earningsRes.data?.data || 0);
      setRecentTransaction(recentTxRes.data?.data?.[0] || null);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to load summary data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
    fetchTransactions();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (!token) {
      toast.error("Authentication token is missing.");
      return;
    }

    setUpdatingId(id);

    try {
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/v1/admin/update-transaction/${id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStatusMap((prev) => ({ ...prev, [id]: newStatus }));
      toast.success(data?.message || "Status updated successfully");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to update transaction status"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const Spinner = () => (
    <div className="flex items-center gap-2">
      <div className="animate-spin h-5 w-5 border-b-2 border-blue-600 rounded-full"></div>
      <span className="text-sm text-gray-600">Loading...</span>
    </div>
  );

  return (
    <div className="bg-blue-50 min-h-screen space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Earnings */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md rounded-xl p-6 flex flex-col gap-4">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className="flex items-center space-x-4">
                <div className="bg-white text-blue-600 p-3 rounded-full">
                  <span className="text-2xl font-bold">$</span>
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium">
                    Total Earnings (This Month)
                  </p>
                  <h2 className="text-3xl font-bold">
                    ${totalEarnings?.toLocaleString() || "0"}
                  </h2>
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
            </>
          )}
        </div>

        {/* Recent Transaction */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4">Recent Transaction</h3>
          {loading ? (
            <Spinner />
          ) : recentTransaction ? (
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
                  <p className="font-medium text-gray-700">Payee</p>
                  <p className="text-sm text-gray-500">
                    {recentTransaction?.patientName || "Unknown"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Account Number</p>
                  <p className="font-semibold">
                    {recentTransaction?.accountNumber
                      ? recentTransaction.accountNumber.replace(
                          /.(?=.{4})/g,
                          "*"
                        )
                      : "************"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No recent transaction found.
            </p>
          )}
        </div>
      </div>

      {/* Transaction History Table */}
      {loading ? (
        <div className="min-h-[300px] flex items-center justify-center bg-white rounded-lg shadow-sm">
          <Spinner />
        </div>
      ) : (
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
                {transactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className="border-b last:border-b-0 hover:bg-blue-50"
                  >
                    <td className="px-4 py-2 whitespace-nowrap">
                      <p className="font-semibold">
                        {tx.accountNumber
                          ? tx.accountNumber.replace(/.(?=.{4})/g, "*")
                          : "************"}
                      </p>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {tx.patientName}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {new Date(tx.dateAndTime).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      ${tx.amount?.toLocaleString() || "0"}
                    </td>
                    <td className="px-4 py-2">
                      {updatingId === tx._id ? (
                        <div className="animate-spin h-5 w-5 border-b-2 border-blue-600 rounded-full"></div>
                      ) : (
                        <select
                          className="border rounded-md text-xs px-2 py-1 bg-white"
                          value={statusMap[tx._id]}
                          onChange={(e) =>
                            handleStatusChange(tx._id, e.target.value)
                          }
                        >
                          {statusOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
