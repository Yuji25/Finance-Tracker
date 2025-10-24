import { useEffect, useState } from "react";
import API from "../utils/api.js";
import toast from "react-hot-toast";
import TransactionForm from "../components/TransactionForm.jsx";

export default function Transactions() {
  const [type, setType] = useState("expense");
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const { data } = await API.get(`/transactions?type=${type}`);
      setTransactions(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load transactions");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [type]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Transactions</h1>

      <div className="flex gap-2 mb-6">
        {["expense", "income", "len_den"].map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`py-2 px-4 rounded ${type === t ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
          >
            {t === "len_den" ? "Len / Den" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <TransactionForm type={type} onSuccess={fetchTransactions} />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">
          All {type === "len_den" ? "Len/Den" : type}s
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-xl">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Amount</th>
                {type !== "len_den" ? (
                  <>
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">Note</th>
                  </>
                ) : (
                  <>
                    <th className="p-2 border">Person</th>
                    <th className="p-2 border">Len/Den Type</th>
                    <th className="p-2 border">Description</th>
                  </>
                )}
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="text-center">
                  <td className="p-2 border">₹{tx.amount}</td>
                  {type !== "len_den" ? (
                    <>
                      <td className="p-2 border">{tx.category_name}</td>
                      <td className="p-2 border">{tx.note}</td>
                    </>
                  ) : (
                    <>
                      <td className="p-2 border">{tx.person_name}</td>
                      <td className="p-2 border">{tx.len_den_type}</td>
                      <td className="p-2 border">{tx.description}</td>
                    </>
                  )}

                  <td className="p-2 border">{tx.transaction_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
