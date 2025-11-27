import React, { useState } from "react";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Plus,
  CreditCard,
  BarChart3,
  List,
  Home,
  Menu,
  X,
  Calendar,
} from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const App = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [dateFilter, setDateFilter] = useState("this-month");
  // Summary data
  const totalIncome = 5000;
  const totalExpenses = 3450;
  const balance = totalIncome - totalExpenses;
  const avgExpense = 115;

  // Category data for pie chart
  const categoryData = [
    { name: "Food", value: 850, color: "#f97316" },
    { name: "Transport", value: 420, color: "#3b82f6" },
    { name: "Shopping", value: 680, color: "#a855f7" },
    { name: "Housing", value: 1200, color: "#22c55e" },
    { name: "Entertainment", value: 180, color: "#ec4899" },
    { name: "Healthcare", value: 120, color: "#ef4444" },
  ];
  // const total = categoryData.reduce((sum, c) => sum + c.value, 0);
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    console.log(payload);
    const item = payload[0];
    // payload[0].percent is provided by Recharts for Pie
    const percent =
      item && typeof item.percent === "number"
        ? (item.percent * 100).toFixed(0)
        : null;

    return (
      <div className="bg-slate-800 border border-slate-700 text-white p-2 rounded shadow">
        <div className="text-sm font-medium">{item.name}</div>
        <div className="text-xs text-slate-300">
          {percent !== null ? `${percent}%` : ""} {percent !== null && "•"}$
          {item.value}
        </div>
      </div>
    );
  };

  // Budget data
  const budgetLimit = 5000;
  const budgetUsed = totalExpenses;
  const budgetPercentage = Math.round((budgetUsed / budgetLimit) * 100);
  const budgetRemaining = budgetLimit - budgetUsed;

  // Recent transactions
  const recentTransactions = [
    {
      id: 1,
      name: "Grocery Store",
      amount: -85.5,
      date: "Nov 05",
      category: "Food",
    },
    {
      id: 2,
      name: "Salary Deposit",
      amount: 2500,
      date: "Nov 01",
      category: "Income",
    },
    {
      id: 3,
      name: "Netflix",
      amount: -15.99,
      date: "Nov 03",
      category: "Entertainment",
    },
    {
      id: 4,
      name: "Uber Ride",
      amount: -24.3,
      date: "Nov 04",
      category: "Transport",
    },
    {
      id: 5,
      name: "Electric Bill",
      amount: -120,
      date: "Nov 02",
      category: "Housing",
    },
  ];

  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: Home },
    { id: "transactions", name: "Transactions", icon: List },
    { id: "analytics", name: "Analytics", icon: BarChart3 },
    { id: "debt", name: "Debt", icon: CreditCard },
  ];

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside
        aria-label="Sidebar"
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700 transition-transform duration-300`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ExpenseFlow</span>
            </div>
            <button
              aria-label="Close sidebar"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left focus:outline-none ${
                    activeTab === item.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-400 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg">
              <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div>
                <div className="text-sm font-medium text-white">John Doe</div>
                <div className="text-xs text-slate-400">john@example.com</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 px-6 sm:px-6 py-4 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <button
                aria-label="Open sidebar"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-400 p-2 rounded-md"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Welcome back, John!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Date Filter Dropdown */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-600 appearance-none cursor-pointer font-medium"
                >
                  <option value="today">All Time</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="this-week">This Week</option>
                  <option value="last-week">Last Week</option>
                  <option value="this-month">This Month</option>
                  <option value="last-month">Last Month</option>
                  <option value="this-year">This Year</option>
                </select>
              </div>
              {/* Make the Add button a little bigger on small screens for easier tapping */}
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 sm:px-4 py-2 sm:py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                aria-label="Add transaction"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Add Transaction</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content - Grid Layout */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="h-full grid grid-cols-12 gap-6">
            {/* Top Row - Summary Cards */}
            <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Income */}
              <div className="bg-linear-to-br from-green-500 to-green-600 rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-green-50 text-xs font-medium mb-1">
                  Total Income
                </div>
                <div className="text-2xl font-bold text-white">
                  ${totalIncome.toLocaleString()}
                </div>
              </div>

              {/* Total Expenses */}
              <div className="bg-linear-to-br from-red-500 to-red-600 rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <TrendingDown className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-red-50 text-xs font-medium mb-1">
                  Total Expenses
                </div>
                <div className="text-2xl font-bold text-white">
                  ${totalExpenses.toLocaleString()}
                </div>
              </div>

              {/* Balance */}
              <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-blue-50 text-xs font-medium mb-1">
                  Balance
                </div>
                <div className="text-2xl font-bold text-white">
                  ${balance.toLocaleString()}
                </div>
              </div>

              {/* Average Expense */}
              <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-purple-50 text-xs font-medium mb-1">
                  Avg Daily Expense
                </div>
                <div className="text-2xl font-bold text-white">
                  ${avgExpense}
                </div>
              </div>
            </div>

            {/* Middle Row - Pie Chart and Budget Status */}
            {/* Stack on small screens: both take full width; on lg screens they split 8/4 */}
            {/* Category-wise Expenses — improved: hover % + tighter alignment */}
            <div className="col-span-12 lg:col-span-8 bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-slate-700">
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-blue-400" />
                Category-wise Expenses
              </h2>

              {/* Custom Tooltip to show percent + value on hover */}
              {/* place custom component inside file scope or above return */}
              {/* Example: const CustomTooltip = ({ active, payload }) => { ... } */}

              <div className="flex flex-col lg:flex-row lg:items-center gap-2 sm:gap-3">
                {/* LEFT: Chart (keeps square ratio, centered) */}
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                  <div className="w-full max-w-60 sm:max-w-[280px] aspect-square mx-auto">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          // remove slice labels (they overlap)
                          // labelLine={false}
                          outerRadius="80%"
                          dataKey="value"
                          label={false}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>

                        {/* use custom tooltip below */}
                        <Tooltip content={<CustomTooltip />} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* RIGHT: Legend — tight, vertically-centered */}
                <div className="w-full lg:w-1/2 space-y-3">
                  {categoryData.map((category) => (
                    <div
                      key={category.name}
                      className="
    relative
    flex items-center justify-between 
    p-3
    bg-slate-700/40
    rounded-lg 
    cursor-pointer
    overflow-hidden
  "
                    >
                      <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition"></div>

                      {/* content */}
                      <div className="relative flex items-center gap-3 min-w-0">
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-slate-200 text-sm font-medium truncate">
                          {category.name}
                        </span>
                      </div>

                      <div className="relative text-white font-semibold text-sm ml-4">
                        ${category.value.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Budget Status */}
            <div className="col-span-12 lg:col-span-4 bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-slate-700">
              {/* Header Row with Add Budget Button */}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-blue-400" />
                  Budget Status
                </h2>

                <button
                  onClick={() => setShowBudgetModal(true)}
                  className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-1.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-1.5 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Budget
                </button>
              </div>

              <div className="space-y-4 h-auto min-h-[280px] flex flex-col justify-between">
                {/* Circular Progress */}
                <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-linear-to-br from-slate-700 to-slate-800 rounded-xl">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-3">
                    <svg
                      viewBox="0 0 112 112"
                      className="w-full h-full transform -rotate-90"
                    >
                      <circle
                        cx="56"
                        cy="56"
                        r="48"
                        stroke="#334155"
                        strokeWidth="10"
                        fill="none"
                      />
                      <circle
                        cx="56"
                        cy="56"
                        r="48"
                        stroke={
                          budgetPercentage > 80
                            ? "#ef4444"
                            : budgetPercentage > 60
                            ? "#f59e0b"
                            : "#22c55e"
                        }
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 48}`}
                        strokeDashoffset={`${
                          2 * Math.PI * 48 * (1 - budgetPercentage / 100)
                        }`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold text-white">
                          {budgetPercentage}%
                        </div>
                        <div className="text-xs text-slate-400">Used</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-xs text-slate-400 mb-1">
                      Budget Limit
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-white">
                      ${budgetLimit.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Budget Details */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-slate-700 bg-opacity-50 rounded-lg">
                    <span className="text-slate-300 text-sm">Spent</span>
                    <span className="font-bold text-red-400 text-sm">
                      ${budgetUsed.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2 bg-slate-700 bg-opacity-50 rounded-lg">
                    <span className="text-slate-300 text-sm">Remaining</span>
                    <span className="font-bold text-green-400 text-sm">
                      ${budgetRemaining.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2 bg-linear-to-r from-blue-500 to-blue-600 rounded-lg">
                    <span className="text-blue-50 text-sm">Daily Avg</span>
                    <span className="font-bold text-white text-sm">
                      ${avgExpense}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - Recent Transactions */}
            <div className="col-span-12 bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                  Recent Transactions
                </h2>
                <button
                  onClick={() => setActiveTab("transactions")}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  See All Transactions
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              {/* responsive grid: 1 on xs, 2 on sm, 3 on md, 5 on lg */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="bg-slate-700 bg-opacity-50 rounded-lg p-3 hover:bg-slate-700 transition-colors"
                    role="article"
                    aria-label={`${transaction.name} ${transaction.amount}`}
                  >
                    <div className="flex flex-col gap-2">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.amount > 0
                            ? "bg-green-500/20"
                            : "bg-red-500/20"
                        }`}
                      >
                        <DollarSign
                          className={`w-5 h-5 ${
                            transaction.amount > 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        />
                      </div>
                      <div>
                        <div className="font-medium text-white text-sm truncate">
                          {transaction.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {transaction.category}
                        </div>
                      </div>
                      <div>
                        <div
                          className={`font-bold ${
                            transaction.amount > 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : ""}$
                          {Math.abs(transaction.amount).toFixed(2)}
                        </div>
                        <div className="text-xs text-slate-400">
                          {transaction.date}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Transaction Modal */}
      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 backdrop-blur-sm  flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-4">
              Add Transaction
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Type
                </label>
                <select className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Expense</option>
                  <option>Income</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Description
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    className="w-full pl-8 pr-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="date"
                    className="w-full pl-12 pr-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Category
                </label>
                <select className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Shopping</option>
                  <option>Housing</option>
                  <option>Entertainment</option>
                  <option>Healthcare</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-colors font-medium shadow-lg">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Add Budget Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 backdrop-blur-sm  flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-4">
              Set Your Budget
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Budget Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    className="w-full pl-8 pr-4 py-3 bg-slate-700 text-white text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="5000.00"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Time Period
                </label>
                <select className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Yearly</option>
                  <option>Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Budget Category (Optional)
                </label>
                <select className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Categories</option>
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Shopping</option>
                  <option>Housing</option>
                  <option>Entertainment</option>
                  <option>Healthcare</option>
                </select>
              </div>
              <div className="bg-slate-700 bg-opacity-50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-start gap-2">
                  <div className="bg-blue-500 bg-opacity-20 p-1 rounded">
                    <DollarSign className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm">
                      Setting a budget helps you track your spending and stay on
                      top of your financial goals.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowBudgetModal(false)}
                  className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-colors font-medium shadow-lg">
                  Set Budget
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default App;
