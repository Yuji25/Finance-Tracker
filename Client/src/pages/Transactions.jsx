import { useEffect, useState } from "react";
import API from "../utils/api.js";
import toast from "react-hot-toast";
import TransactionForm from "../components/TransactionForm.jsx";
import Container from "../components/Container.jsx";
import SectionTabs from "../components/SectionTabs.jsx";
import TransactionList from "../components/TransactionList.jsx";

export default function Transactions() {
  const [type, setType] = useState("expense");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/transactions?type=${type}`);
      setTransactions(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [type]);

  return (
    <Container className="py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading text-3xl">Transactions</h1>
          <p className="text-ink-600 mt-1">Add and review your records</p>
        </div>
        <SectionTabs
          tabs={[{ value: 'expense', label: 'Expense' }, { value: 'income', label: 'Income' }, { value: 'len_den', label: 'Len / Den' }]}
          active={type}
          onChange={setType}
        />
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-medium mb-3">Add {type === 'len_den' ? 'Len / Den' : type}</h2>
          <TransactionForm type={type} onSuccess={fetchTransactions} />
        </div>
        <div className="card">
          <h2 className="font-medium mb-3">All {type === 'len_den' ? 'Len / Den' : type}s</h2>
          {loading ? (
            <p className="text-sm text-ink-600">Loading...</p>
          ) : (
            <TransactionList type={type} transactions={transactions} />
          )}
        </div>
      </div>
    </Container>
  );
}
