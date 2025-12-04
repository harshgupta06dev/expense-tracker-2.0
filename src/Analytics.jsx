import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Sparkles,
  Loader2,
  ChevronDown,
  LayoutDashboard,
  List,
  BarChart3,
  CreditCard,
  Wallet,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const Analytics = () => {
  const [currentPage, setCurrentPage] = useState("analytics");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("Nov 2024");
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // responsive chart sizes (adjust for very small screens)
  const [chartHeight, setChartHeight] = useState(280);
  const [pieRadius, setPieRadius] = useState(80);

  const updateSizes = () => {
    const w = window.innerWidth;
    if (w <= 340) {
      setChartHeight(140);
      setPieRadius(50);
    } else if (w <= 380) {
      setChartHeight(160);
      setPieRadius(60);
    } else if (w <= 480) {
      setChartHeight(200);
      setPieRadius(70);
    } else if (w <= 768) {
      setChartHeight(220);
      setPieRadius(80);
    } else {
      setChartHeight(280);
      setPieRadius(80);
    }
  };

  useEffect(() => {
    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  // All months data
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
  const pieData = categories.map((cat) => ({
    name: cat.name,
    value: currentData[cat.name],
    color: cat.color,
  }));
  const highestCategory = categories.reduce(
    (max, cat) => (currentData[cat.name] > currentData[max.name] ? cat : max),
    categories[0]
  );
  const totalIncome = 5000;
  const savings = totalIncome - currentData.total;
  const savingsRate = ((savings / totalIncome) * 100).toFixed(1);

  const getAIInsights = async () => {
    setAiLoading(true);
    try {
      const expenseData = {
        selectedMonth,
        previousMonth,
        currentData,
        previousData,
        totalIncome,
        savings,
        savingsRate,
        allMonthsData: chartData,
      };
      const prompt = userQuestion
        ? `Based on this expense data for ${selectedMonth}: ${JSON.stringify(
            expenseData
          )}, answer this question: ${userQuestion}. Be specific and use actual numbers in Indian Rupees (₹).`
        : `Analyze this expense data for ${selectedMonth}: ${JSON.stringify(
            expenseData
          )}. Provide clear, actionable insights.`;

      // NOTE: keep your API key secure & handle CORS
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      const insights =
        data.content?.find((item) => item.type === "text")?.text ||
        data?.completion ||
        "Unable to generate insights.";
      setAiInsights(insights);
      setUserQuestion("");
    } catch (error) {
      setAiInsights("Error generating insights. Please try again.");
      console.error("AI Error:", error);
    } finally {
      setAiLoading(false);
    }
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "transactions", label: "Transactions", icon: List },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "debt", label: "Debt", icon: CreditCard },
  ];

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileSidebarOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <header className="w-full md:hidden bg-slate-800 border-b border-slate-700 p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            aria-label="Open menu"
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-slate-700"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-sm">ExpenseFlow</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMonthPicker((s) => !s)}
            className="flex items-center gap-2 bg-slate-700 px-2 py-1.5 rounded-md"
          >
            <Calendar className="w-4 h-4 text-blue-300" />
            <span className="text-xs">{selectedMonth.split(" ")[0]}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showMonthPicker ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {showMonthPicker && (
          <div className="absolute top-14 left-3 right-3 z-40 bg-slate-800 border border-slate-700 rounded-xl p-2 max-h-56 overflow-auto">
            {monthsList.map((month) => (
              <button
                key={month}
                onClick={() => {
                  setSelectedMonth(month);
                  setShowMonthPicker(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md hover:bg-slate-700 ${
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
      </header>

      {/* Sidebar - md+ */}
      <aside className="hidden lg:flex lg:flex-col w-64 h-screen bg-slate-800/50 border-r border-slate-700/50 backdrop-blur-xl sticky top-0">
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <Wallet className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-white">ExpenseFlow</span>
          </div>
        </div>

        <nav className="flex-1  p-4 ">
          {navItems.map((item) => {
            console.log(item);
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <Link to={`/${item.id}`}>
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all  ${
                    isActive
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
                      : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 pt-4 border-t border-slate-700 mt-4">
          <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div>
            <p className="text-sm font-semibold">John Doe</p>
            <p className="text-xs text-gray-400">john@example.com</p>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="w-72 bg-slate-800 border-r border-slate-700 p-4 max-h-screen overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-lg font-semibold">ExpenseFlow</h1>
              </div>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-2 rounded-md hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 border-t border-slate-700 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div>
                  <p className="text-sm font-semibold">John Doe</p>
                  <p className="text-xs text-gray-400">john@example.com</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex-1 bg-black/50"
            onClick={() => setMobileSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main */}
      <main className="flex-1 p-3 md:p-6 overflow-auto">
        {/* Header md+ */}
        <div className="hidden md:flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Analytics</h1>
            <p className="text-gray-400 text-sm">
              Track your spending patterns
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowMonthPicker(!showMonthPicker)}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors border border-slate-700 text-sm"
            >
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="font-semibold text-sm">{selectedMonth}</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform ${
                  showMonthPicker ? "rotate-180" : ""
                }`}
              />
            </button>

            {showMonthPicker && (
              <div className="absolute right-0 mt-2 w-44 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto">
                {monthsList.map((month) => (
                  <button
                    key={month}
                    onClick={() => {
                      setSelectedMonth(month);
                      setShowMonthPicker(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-slate-700 transition-colors ${
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

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {/* Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-blue-100 text-xs md:text-sm mb-1">
                  Total Spent
                </p>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  ₹{currentData.total.toLocaleString()}
                </p>
              </div>
              <div className="bg-white/20 p-2 rounded-xl">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            </div>
            {previousData && (
              <div className="flex items-center gap-2 text-blue-100 text-xs">
                <span
                  className={`font-semibold ${
                    currentData.total > previousData.total
                      ? "text-red-200"
                      : "text-green-200"
                  }`}
                >
                  {currentData.total > previousData.total ? "↑" : "↓"}
                  {Math.abs(
                    ((currentData.total - previousData.total) /
                      previousData.total) *
                      100
                  ).toFixed(1)}
                  %
                </span>
                <span className="text-xs">vs {previousMonth}</span>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-green-100 text-xs md:text-sm mb-1">
                  Money Saved
                </p>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  ₹{savings.toLocaleString()}
                </p>
              </div>
              <div className="bg-white/20 p-2 rounded-xl">
                <TrendingDown className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-green-100 text-xs">
              <span className="font-semibold">{savingsRate}%</span> of your
              income
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-purple-100 text-xs md:text-sm mb-1">
                  Highest Expense
                </p>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  ₹{currentData[highestCategory.name].toLocaleString()}
                </p>
              </div>
              <div className="bg-white/20 p-2 rounded-xl">
                <span className="text-2xl">{highestCategory.icon}</span>
              </div>
            </div>
            <p className="text-purple-100 text-xs">
              {highestCategory.name} -{" "}
              {(
                (currentData[highestCategory.name] / currentData.total) *
                100
              ).toFixed(1)}
              % of total
            </p>
          </div>
        </div>

        {/* Category cards */}
        <section className="bg-slate-800 rounded-2xl p-3 md:p-4 mb-4">
          <h3 className="text-base md:text-lg font-semibold mb-3">
            Spending by Category
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                  className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-3 border border-slate-600 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        {category.icon}
                      </div>
                      <h4 className="font-semibold text-sm md:text-base truncate">
                        {category.name}
                      </h4>
                    </div>
                  </div>

                  <div className="mb-2">
                    <p
                      className="text-xl md:text-2xl font-bold"
                      style={{ color: category.color }}
                    >
                      ₹{current.toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {percentage}% of total spending
                    </p>
                  </div>

                  <div className="relative h-2 bg-slate-600/50 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: category.color,
                      }}
                    />
                  </div>

                  {previousData && (
                    <div className="flex items-center justify-between text-xs">
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
        </section>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-800 rounded-2xl p-3 md:p-4">
            <h3 className="text-base md:text-lg font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" /> Spending Trends
            </h3>
            <div style={{ width: "100%", height: chartHeight }}>
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
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorExpenses"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                      <stop
                        offset="95%"
                        stopColor="#ef4444"
                        stopOpacity={0.1}
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
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#f1f5f9" }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: "8px" }}
                    iconType="circle"
                  />
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

          <div className="bg-slate-800 rounded-2xl p-3 md:p-4 flex flex-col items-center">
            <h3 className="text-base md:text-lg font-semibold mb-2 w-full">
              Category Distribution
            </h3>
            <div style={{ width: "100%", height: chartHeight }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={pieRadius}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => `₹${value.toLocaleString()}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Advisor */}
        <section className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-3 md:p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base md:text-xl font-semibold text-white">
                AI Financial Advisor
              </h3>
              <p className="text-indigo-100 text-xs">
                Get personalized insights for {selectedMonth}
              </p>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-2 mb-3 backdrop-blur-sm">
            <label className="text-sm text-indigo-100 mb-1 block">
              Ask a question (optional)
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder="e.g., How can I save more money?"
                className="flex-1 bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                onKeyPress={(e) => e.key === "Enter" && getAIInsights()}
              />
              <button
                onClick={getAIInsights}
                disabled={aiLoading}
                className="bg-white text-indigo-600 px-3 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm whitespace-nowrap"
              >
                {aiLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Get Insights
                  </>
                )}
              </button>
            </div>
          </div>

          {aiInsights ? (
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> AI Insights & Recommendations
              </h4>
              <div className="text-indigo-50 whitespace-pre-wrap leading-relaxed text-sm">
                {aiInsights}
              </div>
            </div>
          ) : (
            !aiLoading && (
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
                <Sparkles className="w-8 h-8 text-white/50 mx-auto mb-2" />
                <p className="text-indigo-100 text-sm">
                  Click "Get Insights" to receive AI-powered analysis of your
                  spending for {selectedMonth}
                </p>
              </div>
            )
          )}
        </section>
      </main>
    </div>
  );
};

export default Analytics;
