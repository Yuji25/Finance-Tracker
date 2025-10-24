import { useEffect, useState } from "react";
import API from "../utils/api.js";
import toast from "react-hot-toast";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [stats, setStats] = useState({ expenseSummary: {}, incomeSummary: {} });
  const [lenDen, setLenDen] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [balRes, statRes, lenRes] = await Promise.all([
          API.get("/analytics/balance"),
          API.get("/analytics/category-stats"),
          API.get("/analytics/len-den-summary"),
        ]);

        setBalance(balRes.data.balance);
        setStats(statRes.data);
        setLenDen(lenRes.data);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching analytics");
      }
    };
    fetchData();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const formatData = (summary) =>
    Object.entries(summary).map(([name, value]) => ({ name, value }));

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <h2 className="text-xl mb-6">Current Balance: ₹{balance}</h2>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold mb-2">Expense Breakdown</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={formatData(stats.expenseSummary)}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {formatData(stats.expenseSummary).map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Income Breakdown</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={formatData(stats.incomeSummary)}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {formatData(stats.incomeSummary).map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Len/Den Summary</h3>
        <p>
          <strong>Total Len:</strong> ₹{lenDen.totalLen} |{" "}
          <strong>Total Den:</strong> ₹{lenDen.totalDen}
        </p>
        <ul className="mt-2">
          {lenDen.personSummary &&
            Object.entries(lenDen.personSummary).map(([name, val]) => (
              <li key={name}>
                {name}: Len ₹{val.len}, Den ₹{val.den}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
