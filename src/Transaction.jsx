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
} from "lucide-react";

// Sample transaction data (same as before)
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
  const [filterCategory] = useState("all");
  const [filterDate, setFilterDate] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const itemsPerPage = 10;

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

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  // Totals
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6">
      <div className="max-w-280 mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
              Transactions
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              Manage and track all your transactions
            </p>
          </div>

          <div className="flex items-center gap-3 justify-start sm:justify-end">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-500/50"
            >
              <Plus size={18} />
              <span className="text-sm sm:text-base">Add Transaction</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="rounded-2xl p-5 shadow-xl bg-gradient-to-r from-green-500 to-green-600">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="text-white" size={20} />
                <span className="text-white font-medium">Total Income</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                ${totalIncome.toLocaleString()}
              </p>
            </div>

            <div className="rounded-2xl p-5 shadow-xl bg-gradient-to-r from-red-500 to-red-600">
              <div className="flex items-center gap-3 mb-2">
                <TrendingDown className="text-white" size={20} />
                <span className="text-white font-medium">Total Expenses</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                ${totalExpense.toLocaleString()}
              </p>
            </div>

            <div className="rounded-2xl p-5 shadow-xl bg-gradient-to-r from-blue-500 to-blue-600">
              <div className="flex items-center gap-3 mb-2">
                <Filter className="text-white" size={20} />
                <span className="text-white font-medium">Filtered Results</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {filteredTransactions.length}
              </p>
            </div>
          </div>
        </div>

        {/* Transactions Container */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
          {/* Filter Tabs + Search + Actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 sm:px-6 py-3 border-b border-gray-200 gap-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterType("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterType === "all"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType("income")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterType === "income"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Income
              </button>
              <button
                onClick={() => setFilterType("expense")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterType === "expense"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Expense
              </button>
            </div>

            <div className="flex-1 md:flex-none max-w-md relative mx-auto md:mx-0 w-full">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              />
            </div>

            <div className="flex items-center gap-2 justify-end">
              <div className="relative">
                <button
                  onClick={() => setShowDateDropdown(!showDateDropdown)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2 text-sm"
                >
                  <Filter size={16} />
                  Filters
                  <ChevronDown size={14} />
                </button>

                {showDateDropdown && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        setFilterDate("all");
                        setShowDateDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-all ${
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
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-all ${
                        filterDate === "week"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      Today
                    </button>
                    <button
                      onClick={() => {
                        setFilterDate("month");
                        setShowDateDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-all ${
                        filterDate === "month"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      Yesterday
                    </button>
                    <button
                      onClick={() => {
                        setFilterDate("year");
                        setShowDateDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-all rounded-b-lg ${
                        filterDate === "year"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      This Week
                    </button>
                    <button
                      onClick={() => {
                        setFilterDate("year");
                        setShowDateDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-all rounded-b-lg ${
                        filterDate === "year"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      Last Week
                    </button>
                    <button
                      onClick={() => {
                        setFilterDate("year");
                        setShowDateDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-all rounded-b-lg ${
                        filterDate === "year"
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
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-all rounded-b-lg ${
                        filterDate === "year"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      Last Month
                    </button>
                    <button
                      onClick={() => {
                        setFilterDate("year");
                        setShowDateDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-all rounded-b-lg ${
                        filterDate === "year"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      Last Year
                    </button>
                  </div>
                )}
              </div>

              <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all text-sm">
                Export
              </button>
            </div>
          </div>

          {/* Table for md+ screens - fixed layout + explicit col widths */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full table-fixed">
              {/* colgroup keeps column widths consistent */}
              <colgroup>
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>

              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-6 py-4 text-gray-600 font-medium">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-gray-600 font-medium">
                    Name
                  </th>
                  <th className="text-center px-6 py-4 text-gray-600 font-medium">
                    Type
                  </th>
                  <th className="text-right px-6 py-4 text-gray-600 font-medium">
                    Amount
                  </th>
                  <th className="text-right px-6 py-4 text-gray-600 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-gray-500">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  currentTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-700 font-medium whitespace-nowrap ">
                        {formatDate(transaction.date)}
                      </td>

                      {/* Name - single line with ellipsis to avoid changing column width */}
                      <td className="px-6 py-4 text-gray-800 overflow-hidden whitespace-nowrap text-ellipsis">
                        {transaction.name}
                      </td>

                      <td className="px-6 py-4 text-center">
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

                      <td className="px-6 py-4 text-right text-gray-800 font-semibold">
                        ${transaction.amount.toLocaleString()}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-[3px]">
                          <button
                            onClick={() =>
                              console.log("Edit transaction:", transaction.id)
                            }
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Edit transaction"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() =>
                              console.log("Delete transaction:", transaction.id)
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
          </div>

          {/* Card list for small screens (unchanged) */}
          <div className="md:hidden p-4">
            {currentTransactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No transactions found
              </div>
            ) : (
              <div className="space-y-3">
                {currentTransactions.map((t) => (
                  <div
                    key={t.id}
                    className="bg-gray-50 rounded-lg p-3 shadow-sm flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm text-gray-600">
                        {formatDate(t.date)}
                      </div>
                      <div className="font-medium text-gray-800">{t.name}</div>
                      <div className="text-xs mt-1">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            t.type === "income"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                        </span>
                        <span className="ml-2 text-gray-500 text-xs">
                          • {t.category}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold text-gray-800">
                        ${t.amount.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 justify-end mt-2">
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
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col md:flex-row items-center md:justify-between px-4 sm:px-6 py-3 border-t border-gray-200 bg-gray-50 gap-3">
              <p className="text-gray-600 text-sm">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredTransactions.length)} of{" "}
                {filteredTransactions.length} transactions
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 text-sm"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
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
                  className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 text-sm"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              Add Transaction
            </h2>
            <p className="text-slate-400 mb-4">
              This is a demo. In a real app, you would have a form here to add
              transactions.
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
  );
};

export default TransactionsPage;
