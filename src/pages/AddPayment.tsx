import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  const token = localStorage.getItem("userAuthToken");
  if (!token) {
    toast.error("Authentication token is missing.");
    navigate("/signin");
    return;
  }

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/get-transactions`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.status) {
        const fetchedTransactions = res.data?.data || [];
        setTransactions(fetchedTransactions);

        const map: { [key: string]: string } = {};
        fetchedTransactions.forEach((tx: any) => {
          map[tx._id] = tx.status;
        });
        setStatusMap(map);
      } else {
        toast.error("Failed to fetch transactions");
      }
    } catch (error: any) {
      if (error.response?.data?.code === 401) {
        localStorage.removeItem("userAuthToken");
        toast.error("Unauthorized access. Please log in again.");
        navigate("/signin");
      }
      toast.error(
        error?.response?.data?.message || "Failed to fetch transactions"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
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

      if (earningsRes.data.status) {
        setTotalEarnings(earningsRes.data?.data || 0);
      } else {
        toast.error("Failed to fetch total earnings");
      }

      if (recentTxRes.data.status) {
        setRecentTransaction(recentTxRes.data?.data?.[0] || null);
      } else {
        toast.error("Failed to fetch recent transaction");
      }
    } catch (error: any) {
      if (error.response?.data?.code === 401) {
        localStorage.removeItem("userAuthToken");
        toast.error("Unauthorized access. Please log in again.");
        navigate("/signin");
      }
      toast.error(
        error?.response?.data?.message || "Failed to load summary data"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/v1/admin/update-transaction/${id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.status) {
        setStatusMap((prev) => ({ ...prev, [id]: newStatus }));
        toast.success(res.data?.message || "Status updated successfully");
      } else {
        toast.error("Failed to update transaction status");
      }
    } catch (error: any) {
      if (error.response?.data?.code === 401) {
        localStorage.removeItem("userAuthToken");
        toast.error("Unauthorized access. Please log in again.");
        navigate("/signin");
      }
      toast.error(
        error?.response?.data?.message || "Failed to update transaction status"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const Spinner = () => (
    <div className="flex items-center gap-2">
      <div className="animate-spin h-5 w-5 border-b-2 border-[#0077B6] rounded-full"></div>
      <span className="text-sm text-gray-600">Loading...</span>
    </div>
  );

  return (
    <div className="max-h-screen space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Earnings */}
        <div className="bg-gradient-to-br from-[#0077B6] to-[#005f8f] text-white shadow-md rounded-xl p-6 flex flex-col gap-4">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className="flex items-center space-x-4">
                <div className="bg-white text-[#0077B6] p-3 rounded-full">
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
                <button className="bg-white text-[#0077B6] hover:bg-gray-100 text-sm font-semibold px-4 py-1.5 rounded-full">
                  + Topup
                </button>
                <button className="bg-white text-[#0077B6] hover:bg-gray-100 text-sm font-semibold px-4 py-1.5 rounded-full">
                  + Transfer
                </button>
                <button className="bg-white text-[#0077B6] hover:bg-gray-100 text-sm font-semibold px-4 py-1.5 rounded-full">
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
              <div className="bg-[#0077B6] p-3 rounded-full">
                <img
                  src="./images/wallet.png"
                  alt="wallet"
                  className="w-6 h-6 invert object-contain"
                />
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
              <thead className="bg-[#0077B620] text-gray-700">
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
                    className="border-b last:border-b-0 hover:bg-[#0077B610]"
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
                        <div className="animate-spin h-5 w-5 border-b-2 border-[#0077B6] rounded-full"></div>
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
