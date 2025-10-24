import { useEffect, useMemo, useState } from "react";
import API from "../utils/api.js";
import toast from "react-hot-toast";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Container from "../components/Container.jsx";
import StatCard from "../components/StatCard.jsx";
import SectionTabs from "../components/SectionTabs.jsx";
import TransactionList from "../components/TransactionList.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [stats, setStats] = useState({ expenseSummary: {}, incomeSummary: {} });
  const [lenDen, setLenDen] = useState({});
  const [activeSection, setActiveSection] = useState('expense');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [balRes, statRes, lenRes] = await Promise.all([
          API.get("/analytics/balance"),
          API.get("/analytics/category-stats"),
          API.get("/analytics/len-den-summary"),
        ]);

        setBalance(balRes.data.balance);
        setStats(statRes.data);
        setLenDen(lenRes.data);
        const { data: tx } = await API.get(`/transactions?type=${activeSection}`);
        setTransactions(tx);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const formatData = (summary) =>
    Object.entries(summary || {}).map(([name, value]) => ({ name, value }));

  const totals = useMemo(() => ({
    expense: Object.values(stats.expenseSummary || {}).reduce((a, b) => a + b, 0),
    income: Object.values(stats.incomeSummary || {}).reduce((a, b) => a + b, 0),
    lend: lenDen.totalLen || 0,
    debt: lenDen.totalDen || 0,
  }), [stats, lenDen]);

  return (
    <Container className="py-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="heading text-3xl">Overview</h1>
          <p className="text-ink-600 mt-1">Your money at a glance</p>
        </div>
        <div className="card-muted">
          <p className="text-sm text-ink-500">Current Balance</p>
          <p className="heading text-2xl mt-1">₹{balance}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mt-6">
        <StatCard title="Income" value={`₹${totals.income}`} trend={"+"} />
        <StatCard title="Expense" value={`₹${totals.expense}`} trend={"-"} />
        <StatCard title="Lent (Len)" value={`₹${totals.lend}`} />
        <StatCard title="Borrowed (Den)" value={`₹${totals.debt}`} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <div className="card">
          <h3 className="font-medium mb-2">Expense Breakdown</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={formatData(stats.expenseSummary)} dataKey="value" nameKey="name" outerRadius={110} label>
                  {formatData(stats.expenseSummary).map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h3 className="font-medium mb-2">Income Breakdown</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={formatData(stats.incomeSummary)} dataKey="value" nameKey="name" outerRadius={110} label>
                  {formatData(stats.incomeSummary).map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="heading text-xl">Transactions</h3>
          <SectionTabs
            active={activeSection}
            onChange={setActiveSection}
            tabs={[{ value: 'expense', label: 'Expense' }, { value: 'income', label: 'Income' }, { value: 'len_den', label: 'Len / Den' }]}
          />
        </div>
        {loading ? (
          <div className="card flex items-center justify-center h-40"><LoadingSpinner label="Loading transactions" /></div>
        ) : (
          <TransactionList type={activeSection} transactions={transactions} />
        )}
      </div>
    </Container>
  );
}
