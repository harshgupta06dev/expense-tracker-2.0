import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Plus,
  TrendingUp,
  TrendingDown,
  Edit2,
  Trash2,
  ChevronDown,
  LayoutDashboard,
  BarChart3,
  Receipt,
  CreditCard,
  Menu,
  X,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

// Sample transaction data
const generateSampleData = () => {
  const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Housing",
    "Entertainment",
    "Healthcare",
    "Salary",
    "Freelance",
    "Investment",
  ];
  const names = [
    "Grocery Store",
    "Uber Ride",
    "Amazon",
    "Rent Payment",
    "Netflix",
    "Hospital",
    "Monthly Salary",
    "Project Payment",
    "Dividend",
  ];

  const transactions = [];
  for (let i = 0; i < 50; i++) {
    const type = Math.random() > 0.3 ? "expense" : "income";
    const categoryIndex =
      type === "expense"
        ? Math.floor(Math.random() * 6)
        : Math.floor(Math.random() * 3) + 6;

    transactions.push({
      id: i + 1,
      date: new Date(
        2024,
        10 - Math.floor(Math.random() * 3),
        Math.floor(Math.random() * 28) + 1
      ).toISOString(),
      name: names[categoryIndex],
      type: type,
      amount:
        type === "expense"
          ? Math.floor(Math.random() * 500) + 20
          : Math.floor(Math.random() * 3000) + 500,
      category: categories[categoryIndex],
    });
  }

  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const TransactionsPage = () => {
  const [transactions] = useState(generateSampleData());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterDate, setFilterDate] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [activePage, setActivePage] = useState("transactions");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemsPerPage = 10;

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "transactions", label: "Transactions", icon: Receipt },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "debt", label: "Debt", icon: CreditCard },
  ];

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        filterType === "all" || transaction.type === filterType;
      const matchesCategory =
        filterCategory === "all" || transaction.category === filterCategory;

      let matchesDate = true;
      if (filterDate !== "all") {
        const transDate = new Date(transaction.date);
        const today = new Date();

        if (filterDate === "today") {
          matchesDate = transDate.toDateString() === today.toDateString();
        } else if (filterDate === "week") {
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = transDate >= weekAgo;
        } else if (filterDate === "month") {
          matchesDate =
            transDate.getMonth() === today.getMonth() &&
            transDate.getFullYear() === today.getFullYear();
        } else if (filterDate === "year") {
          matchesDate = transDate.getFullYear() === today.getFullYear();
        }
      }

      return matchesSearch && matchesType && matchesCategory && matchesDate;
    });
  }, [transactions, searchTerm, filterType, filterCategory, filterDate]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleNavigation = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    console.log(`Navigating to ${pageId}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Sidebar Navigation - Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 h-screen bg-slate-800/50 border-r border-slate-700/50 backdrop-blur-xl sticky top-0">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <Wallet className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-white">ExpenseFlow</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <Link to={`/${item.id}`} key={item.id}>
                <button
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
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

        {/* User Profile */}
        <div className="p-4 border-t border-slate-700/50">
          <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl">
            <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-sm">John Doe</p>
              <p className="text-slate-400 text-xs">john@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <aside
            className="w-64 h-full bg-slate-800 border-r border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Logo */}
            <div className="p-6 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Wallet className="text-white" size={24} />
                </div>
                <span className="text-xl font-bold text-white">
                  ExpenseFlow
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="p-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                      isActive
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
                        : "text-slate-400 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* User Profile */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
              <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl">
                <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">John Doe</p>
                  <p className="text-slate-400 text-xs">john@example.com</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-h-screen overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="flex items-center gap-3 w-full md:w-auto">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 bg-slate-700/30 text-white hover:bg-slate-700/50 rounded-lg transition-all"
                >
                  <Menu size={20} />
                </button>
                <div>
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                    Transactions
                  </h1>
                  <p className="text-slate-400 text-sm md:text-base">
                    Manage and track all your transactions
                  </p>
                </div>
              </div>

              <div className="w-full md:w-auto flex gap-2 md:gap-3 justify-end">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-5 py-2 md:py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-500/50"
                >
                  <Plus size={16} />
                  <span className="text-sm md:text-base">Add Transaction</span>
                </button>
              </div>
            </div>

            {/* Summary Cards - responsive, equal height */}
            <div className="mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                {[
                  {
                    icon: TrendingUp,
                    title: "Total Income",
                    value: `$${totalIncome.toLocaleString()}`,
                    style: "from-green-500 to-green-600",
                  },
                  {
                    icon: TrendingDown,
                    title: "Total Expenses",
                    value: `$${totalExpense.toLocaleString()}`,
                    style: "from-red-500 to-red-600",
                  },
                  {
                    icon: Filter,
                    title: "Filtered Results",
                    value: `${filteredTransactions.length}`,
                    style: "from-blue-500 to-blue-600",
                  },
                ].map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl p-4 shadow-xl bg-gradient-to-br ${card.style} flex flex-col justify-between`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="text-white" size={18} />
                        <span className="text-white font-medium text-sm">
                          {card.title}
                        </span>
                      </div>
                      <p className="mt-3 text-lg md:text-2xl lg:text-3xl font-bold text-white truncate">
                        {card.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filters + Search - stacked on mobile */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl max-w-6xl mx-auto mb-6">
              <div className="px-3 py-3 md:px-6 md:py-4 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setFilterType("all")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        filterType === "all"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilterType("income")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        filterType === "income"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Income
                    </button>
                    <button
                      onClick={() => setFilterType("expense")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        filterType === "expense"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Expense
                    </button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                      <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 md:gap-3 items-center">
                    <div className="relative">
                      <button
                        onClick={() => setShowDateDropdown(!showDateDropdown)}
                        className="px-2 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2 text-sm"
                      >
                        <Filter size={14} />
                        <span className="hidden sm:inline">Filter by date</span>
                        <ChevronDown size={14} />
                      </button>

                      {showDateDropdown && (
                        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <button
                            onClick={() => {
                              setFilterDate("all");
                              setShowDateDropdown(false);
                            }}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-all ${
                              filterDate === "all"
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-700"
                            }`}
                          >
                            All Time
                          </button>
                          <button
                            onClick={() => {
                              setFilterDate("week");
                              setShowDateDropdown(false);
                            }}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-all ${
                              filterDate === "week"
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-700"
                            }`}
                          >
                            This Week
                          </button>
                          <button
                            onClick={() => {
                              setFilterDate("month");
                              setShowDateDropdown(false);
                            }}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-all ${
                              filterDate === "month"
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-700"
                            }`}
                          >
                            This Month
                          </button>
                          <button
                            onClick={() => {
                              setFilterDate("year");
                              setShowDateDropdown(false);
                            }}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-all rounded-b-lg ${
                              filterDate === "year"
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-700"
                            }`}
                          >
                            This Year
                          </button>
                        </div>
                      )}
                    </div>

                    <button className="px-2 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all text-sm">
                      Export
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop table */}
              <div className="overflow-x-auto">
                <table className="w-full hidden md:table">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left px-4 py-3 text-gray-600 font-medium">
                        Date
                      </th>
                      <th className="text-left px-4 py-3 text-gray-600 font-medium">
                        Name
                      </th>
                      <th className="text-left px-4 py-3 text-gray-600 font-medium">
                        Type
                      </th>
                      <th className="text-right px-4 py-3 text-gray-600 font-medium">
                        Amount
                      </th>
                      <th className="text-center px-4 py-3 text-gray-600 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTransactions.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-12 text-gray-500"
                        >
                          No transactions found
                        </td>
                      </tr>
                    ) : (
                      currentTransactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">
                            {formatDate(transaction.date)}
                          </td>
                          <td className="px-4 py-3 text-gray-800 truncate max-w-[220px]">
                            {transaction.name}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-3 py-1 rounded-md text-sm font-medium ${
                                transaction.type === "income"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {transaction.type.charAt(0).toUpperCase() +
                                transaction.type.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right text-gray-800 font-semibold whitespace-nowrap">
                            ${transaction.amount.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() =>
                                  console.log(
                                    "Edit transaction:",
                                    transaction.id
                                  )
                                }
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                title="Edit transaction"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() =>
                                  console.log(
                                    "Delete transaction:",
                                    transaction.id
                                  )
                                }
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                title="Delete transaction"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

                {/* Mobile list - shown on small screens */}
                <div className="md:hidden p-3 space-y-3">
                  {currentTransactions.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No transactions found
                    </div>
                  ) : (
                    currentTransactions.map((t) => (
                      <div
                        key={t.id}
                        className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex items-start justify-between"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-gray-500">
                            {formatDate(t.date)}
                          </div>
                          <div className="font-medium text-gray-800 truncate">
                            {t.name}
                          </div>
                          <div className="mt-2 flex items-center gap-2 text-xs">
                            <span
                              className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                t.type === "income"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {t.type}
                            </span>
                            <span className="text-gray-500 truncate">
                              {t.category}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3 flex flex-col items-end gap-2">
                          <div className="font-semibold text-sm whitespace-nowrap">
                            ${t.amount.toLocaleString()}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => console.log("Edit", t.id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => console.log("Delete", t.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col md:flex-row items-center justify-between px-3 py-3 border-t border-gray-200 bg-gray-50 gap-3">
                  <p className="text-gray-600 text-sm">
                    Showing {startIndex + 1} to{" "}
                    {Math.min(endIndex, filteredTransactions.length)} of{" "}
                    {filteredTransactions.length} transactions
                  </p>
                  <div className="flex gap-2 items-center flex-wrap">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                      className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                    >
                      <ChevronLeft size={14} /> Prev
                    </button>
                    <div className="flex gap-1">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`px-3 py-2 rounded-lg transition-all ${
                            currentPage === i + 1
                              ? "bg-blue-500 text-white"
                              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                    >
                      Next <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Add Transaction Modal - full screen on mobile */}
            {showAddModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full sm:w-3/4 md:w-1/2 border border-slate-700 mx-2 sm:mx-0">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Add Transaction
                  </h2>
                  <p className="text-slate-400 mb-4">
                    This is a demo. In a real app, you would have a form here to
                    add transactions.
                  </p>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
