import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Sparkles,
  Loader2,
  ChevronDown,
} from "lucide-react";

const Analytics = () => {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("Nov 2024");
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  // Data
  const allMonthsData = {
    "Jan 2024": {
      total: 2650,
      Food: 700,
      Transport: 380,
      Shopping: 550,
      Housing: 1200,
      Entertainment: 150,
      Healthcare: 100,
    },
    "Feb 2024": {
      total: 2580,
      Food: 680,
      Transport: 370,
      Shopping: 520,
      Housing: 1200,
      Entertainment: 140,
      Healthcare: 90,
    },
    "Mar 2024": {
      total: 2800,
      Food: 750,
      Transport: 400,
      Shopping: 600,
      Housing: 1200,
      Entertainment: 160,
      Healthcare: 110,
    },
    "Apr 2024": {
      total: 2900,
      Food: 780,
      Transport: 420,
      Shopping: 650,
      Housing: 1200,
      Entertainment: 170,
      Healthcare: 100,
    },
    "May 2024": {
      total: 2750,
      Food: 720,
      Transport: 390,
      Shopping: 580,
      Housing: 1200,
      Entertainment: 155,
      Healthcare: 105,
    },
    "Jun 2024": {
      total: 2800,
      Food: 750,
      Transport: 380,
      Shopping: 650,
      Housing: 1200,
      Entertainment: 150,
      Healthcare: 100,
    },
    "Jul 2024": {
      total: 3200,
      Food: 820,
      Transport: 400,
      Shopping: 700,
      Housing: 1200,
      Entertainment: 180,
      Healthcare: 120,
    },
    "Aug 2024": {
      total: 2900,
      Food: 780,
      Transport: 390,
      Shopping: 620,
      Housing: 1200,
      Entertainment: 160,
      Healthcare: 110,
    },
    "Sep 2024": {
      total: 3450,
      Food: 850,
      Transport: 420,
      Shopping: 680,
      Housing: 1200,
      Entertainment: 180,
      Healthcare: 120,
    },
    "Oct 2024": {
      total: 3100,
      Food: 800,
      Transport: 410,
      Shopping: 640,
      Housing: 1200,
      Entertainment: 170,
      Healthcare: 115,
    },
    "Nov 2024": {
      total: 3450,
      Food: 850,
      Transport: 420,
      Shopping: 680,
      Housing: 1200,
      Entertainment: 180,
      Healthcare: 120,
    },
  };

  const monthsList = Object.keys(allMonthsData);
  const currentMonthIndex = monthsList.indexOf(selectedMonth);
  const previousMonth =
    currentMonthIndex > 0 ? monthsList[currentMonthIndex - 1] : null;

  const currentData = allMonthsData[selectedMonth];
  const previousData = previousMonth ? allMonthsData[previousMonth] : null;

  const categories = [
    { name: "Food", color: "#fb923c", icon: "🍔" },
    { name: "Transport", color: "#3b82f6", icon: "🚗" },
    { name: "Shopping", color: "#a855f7", icon: "🛍️" },
    { name: "Housing", color: "#10b981", icon: "🏠" },
    { name: "Entertainment", color: "#ec4899", icon: "🎬" },
    { name: "Healthcare", color: "#ef4444", icon: "⚕️" },
  ];

  const chartData = monthsList
    .slice(-6)
    .map((month) => ({ month: month.split(" ")[0], ...allMonthsData[month] }));

  // const pieData = categories.map((cat) => ({
  //   name: cat.name,
  //   value: currentData[cat.name],
  //   color: cat.color,
  // }));

  const highestCategory = categories.reduce(
    (max, cat) => (currentData[cat.name] > currentData[max.name] ? cat : max),
    categories[0]
  );

  const totalIncome = 5000;
  const savings = totalIncome - currentData.total;
  const savingsRate = ((savings / totalIncome) * 100).toFixed(1);

  // placeholder AI function (keeps your original structure)
  const getAIInsights = async () => {
    setAiLoading(true);
    try {
      // NOTE: keep your real API call; this is placeholder to preserve responsiveness example
      await new Promise((r) => setTimeout(r, 600));
      setAiInsights(
        `Sample insights for ${selectedMonth}. Savings: ₹${savings.toLocaleString()} (${savingsRate}%).`
      );
      setUserQuestion("");
    } catch (err) {
      setAiInsights("Error generating insights.", err);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white py-6">
      {/* centered content container with max width 1360px */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Analytics</h1>
            <p className="text-sm text-gray-400">
              Track your spending patterns
            </p>
          </div>

          {/* Month Selector */}
          <div className="relative">
            <button
              onClick={() => setShowMonthPicker((s) => !s)}
              className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 px-4 sm:px-6 py-2.5 rounded-xl transition-colors border border-slate-700"
            >
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="font-medium text-sm">{selectedMonth}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showMonthPicker ? "rotate-180" : ""
                }`}
              />
            </button>

            {showMonthPicker && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 max-h-72 overflow-y-auto">
                {monthsList.map((month) => (
                  <button
                    key={month}
                    onClick={() => {
                      setSelectedMonth(month);
                      setShowMonthPicker(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors ${
                      selectedMonth === month
                        ? "bg-blue-600 text-white"
                        : "text-gray-300"
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Card 1 */}
          <div className="flex flex-col justify-between bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl p-5 sm:p-6 h-full">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-blue-100 text-xs sm:text-sm mb-1">
                  Total Spent
                </p>
                <p className="text-2xl sm:text-4xl font-bold text-white">
                  ₹{currentData.total.toLocaleString()}
                </p>
              </div>
              <div className="bg-white/20 p-2.5 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>

            {previousData && (
              <div className="mt-4 text-xs sm:text-sm text-blue-100 flex items-center gap-2">
                <span
                  className={`font-semibold ${
                    currentData.total > previousData.total
                      ? "text-red-200"
                      : "text-green-200"
                  }`}
                >
                  {currentData.total > previousData.total ? "↑" : "↓"}{" "}
                  {Math.abs(
                    ((currentData.total - previousData.total) /
                      previousData.total) *
                      100
                  ).toFixed(1)}
                  %
                </span>
                <span className="text-gray-200">vs {previousMonth}</span>
              </div>
            )}
          </div>

          {/* Card 2 */}
          <div className="flex flex-col justify-between bg-linear-to-br from-green-500 to-green-600 rounded-2xl p-5 sm:p-6 h-full">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-green-100 text-xs sm:text-sm mb-1">
                  Money Saved
                </p>
                <p className="text-2xl sm:text-4xl font-bold text-white">
                  ₹{savings.toLocaleString()}
                </p>
              </div>
              <div className="bg-white/20 p-2.5 rounded-lg">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-green-100">
              <span className="font-semibold">{savingsRate}%</span> of your
              income
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col justify-between bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl p-5 sm:p-6 h-full">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-purple-100 text-xs sm:text-sm mb-1">
                  Highest Expense
                </p>
                <p className="text-2xl sm:text-4xl font-bold text-white">
                  ₹{currentData[highestCategory.name].toLocaleString()}
                </p>
              </div>
              <div className="bg-white/20 p-2.5 rounded-lg text-center">
                <span className="text-2xl">{highestCategory.icon}</span>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-purple-100">
              {highestCategory.name} -{" "}
              {(
                (currentData[highestCategory.name] / currentData.total) *
                100
              ).toFixed(1)}
              % of total
            </p>
          </div>
        </div>

        {/* Category-wise Spending */}
        <div className="bg-slate-800 rounded-2xl p-5 sm:p-6 mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">
            Spending by Category
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {categories.map((category) => {
              const current = currentData[category.name];
              const previous = previousData ? previousData[category.name] : 0;
              const change = previous
                ? (((current - previous) / previous) * 100).toFixed(1)
                : 0;
              const isIncrease = current > previous;
              const percentage = ((current / currentData.total) * 100).toFixed(
                1
              );

              return (
                <div
                  key={category.name}
                  className="bg-linear-to-br from-slate-700 to-slate-800 rounded-lg p-4 sm:p-5 border border-slate-600"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-lg"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        {category.icon}
                      </div>
                      <h4 className="font-semibold text-sm sm:text-base">
                        {category.name}
                      </h4>
                    </div>

                    <div className="text-right">
                      <p
                        className="text-lg sm:text-2xl font-bold"
                        style={{ color: category.color }}
                      >
                        ₹{current.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400">{percentage}%</p>
                    </div>
                  </div>

                  <div className="relative h-2 bg-slate-600/50 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: category.color,
                      }}
                    />
                  </div>

                  {previousData && (
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-gray-400">vs last month</span>
                      <span
                        className={`font-semibold ${
                          isIncrease ? "text-red-400" : "text-green-400"
                        }`}
                      >
                        {isIncrease ? "↑" : "↓"} {Math.abs(change)}%
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Spending Trend */}
          <div className="bg-slate-800 rounded-2xl p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" /> Spending Trends
            </h3>
            <div className="w-full h-64 sm:h-72 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData.map((item) => ({
                    ...item,
                    income: totalIncome,
                  }))}
                >
                  <defs>
                    <linearGradient
                      id="colorIncome"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#10b981"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0.08}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorExpenses"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#ef4444"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="95%"
                        stopColor="#ef4444"
                        stopOpacity={0.08}
                      />
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
                      backgroundColor: "#0f1724",
                      border: "1px solid #334155",
                      borderRadius: 8,
                    }}
                    labelStyle={{ color: "#f1f5f9" }}
                  />
                  <Legend wrapperStyle={{ paddingTop: 12 }} iconType="circle" />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#10b981"
                    fill="url(#colorIncome)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#ef4444"
                    fill="url(#colorExpenses)"
                    strokeWidth={2}
                    name="expenses"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-slate-800 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-400" />
              Top 3 Expenses
            </h3>
            <div className="space-y-4">
              {categories
                .map((cat) => ({ ...cat, amount: currentData[cat.name] }))
                .sort((a, b) => b.amount - a.amount)
                .slice(0, 3)
                .map((cat, index) => {
                  const previous = previousData ? previousData[cat.name] : 0;
                  const change = previous
                    ? (((cat.amount - previous) / previous) * 100).toFixed(1)
                    : 0;
                  const isIncrease = cat.amount > previous;

                  return (
                    <div
                      key={cat.name}
                      className="bg-slate-700/50 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-600 w-10 h-10 rounded-full flex items-center justify-center text-2xl">
                            {cat.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400 text-sm">
                                #{index + 1}
                              </span>
                              <h4 className="font-semibold">{cat.name}</h4>
                            </div>
                            <p className="text-gray-400 text-sm">
                              {((cat.amount / currentData.total) * 100).toFixed(
                                1
                              )}
                              % of spending
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className="text-2xl font-bold"
                            style={{ color: cat.color }}
                          >
                            ₹{cat.amount.toLocaleString()}
                          </p>
                          {previousData && (
                            <p
                              className={`text-sm font-semibold ${
                                isIncrease ? "text-red-400" : "text-green-400"
                              }`}
                            >
                              {isIncrease ? "↑" : "↓"} {Math.abs(change)}%
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* AI Panel */}
        <div className="bg-linear-to-br from-indigo-600 to-purple-600 rounded-2xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2.5 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-2xl font-semibold text-white">
                  AI Financial Advisor
                </h3>
                <p className="text-xs sm:text-sm text-indigo-100">
                  Get personalized insights for {selectedMonth}
                </p>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && getAIInsights()}
                placeholder="e.g., How can I save more money?"
                className="w-full sm:w-80 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button
                onClick={getAIInsights}
                disabled={aiLoading}
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {aiLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>Get Insights</>
                )}
              </button>
            </div>
          </div>

          {/* AI Output */}
          <div className="bg-white/10 rounded-lg p-4">
            {aiInsights ? (
              <div className="text-indigo-50 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                {aiInsights}
              </div>
            ) : (
              <div className="text-indigo-100 text-sm">
                Click "Get Insights" to receive AI-powered analysis of your
                spending for {selectedMonth}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
