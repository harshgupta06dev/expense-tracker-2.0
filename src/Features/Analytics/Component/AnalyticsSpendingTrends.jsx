import { TrendingUp } from "lucide-react";
import { useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  buildSpendingTrends,
  filterTransactionsByMonths,
  getLast6Months,
} from "../AnalyticsSlice";
function AnalyticsSpendingTrends({ totalIncome, chartHeight }) {
  const transactions = useSelector((state) => state.transactions.list);

  const last6Months = useSelector(getLast6Months);
  const filteredTransactions = filterTransactionsByMonths(
    transactions,
    last6Months,
  );

  const spendingTrendsData = buildSpendingTrends(
    filteredTransactions,
    last6Months,
  );
  const currentYear = new Date().getFullYear();
  const currentYearTransactions = transactions.filter((tx) => {
    return new Date(tx.date).getFullYear() === currentYear;
  });

  if (currentYearTransactions.length === 0) return null;

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyData = Object.values(
    currentYearTransactions.reduce((acc, tx) => {
      if (tx.type !== "Expense") return acc;

      const monthIndex = new Date(tx.date).getMonth();
      const monthName = monthNames[monthIndex];

      if (!acc[monthName]) {
        acc[monthName] = {
          month: monthName,
          total: 0,
        };
      }

      acc[monthName].total += tx.amount;
      return acc;
    }, {}),
  );
  console.log(
    "this is a spending  trendsdata",
    spendingTrendsData,
    "this is a monyhly data",
    monthlyData,
  );
  spendingTrendsData.map((item) => console.log(item));
  return (
    <div className="bg-slate-800 rounded-2xl p-3 md:p-4">
      <h3 className="text-base md:text-lg font-semibold mb-2 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-blue-400" /> Spending Trends by
        Monthly Wise
      </h3>
      <div style={{ width: "100%", height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={spendingTrendsData}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              axisLine={false}
              tickLine={false}
            />
            <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#f1f5f9" }}
            />
            <Legend wrapperStyle={{ paddingTop: "8px" }} iconType="circle" />
            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#10b981"
              fill="url(#colorIncome)"
              strokeWidth={2}
            />

            <Area
              type="monotone"
              dataKey="expense"
              name="Expense"
              stroke="#ef4444"
              fill="url(#colorExpenses)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AnalyticsSpendingTrends;
