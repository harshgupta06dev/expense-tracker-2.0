import { useState } from "react";
import {
  Plus,
  X,
  Trash2,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Menu,
  ChevronLeft,
  ChevronRight,
  Wallet,
  CheckCircle,
  Home,
  List,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DebtTracker() {
  const [debts, setDebts] = useState([
    {
      id: 1,
      type: "owed_to_me",
      person: "John Smith",
      amount: 250,
      paid: 0,
      description: "Lunch money",
      date: "2025-01-15",
    },
    {
      id: 2,
      type: "i_owe",
      person: "Sarah Wilson",
      amount: 180,
      paid: 50,
      description: "Concert tickets",
      date: "2025-01-18",
    },
    {
      id: 3,
      type: "credit",
      person: "Electronics Store",
      amount: 899,
      paid: 200,
      description: "Laptop purchase",
      date: "2025-01-10",
    },
    {
      id: 4,
      type: "owed_to_me",
      person: "Mike Brown",
      amount: 75,
      paid: 0,
      description: "Gas money",
      date: "2025-01-20",
    },
    {
      id: 5,
      type: "i_owe",
      person: "Lisa Chen",
      amount: 45,
      paid: 0,
      description: "Movie tickets",
      date: "2025-01-22",
    },
    {
      id: 6,
      type: "credit",
      person: "Furniture Mall",
      amount: 450,
      paid: 450,
      description: "Office chair",
      date: "2025-01-12",
      settled: true,
    },
    {
      id: 7,
      type: "owed_to_me",
      person: "David Lee",
      amount: 320,
      paid: 100,
      description: "Birthday gift share",
      date: "2025-01-25",
    },
    {
      id: 8,
      type: "i_owe",
      person: "Emma Watson",
      amount: 95,
      paid: 0,
      description: "Dinner split",
      date: "2025-01-26",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showSettleModal, setShowSettleModal] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [settleAmount, setSettleAmount] = useState("");
  const [formType, setFormType] = useState("owed_to_me");
  const [formPerson, setFormPerson] = useState("");
  const [formAmount, setFormAmount] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formDate, setFormDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const itemsPerPage = 5;

  const activeDebts = debts.filter((d) => !d.settled);
  const totalOwedToMe = activeDebts
    .filter((d) => d.type === "owed_to_me")
    .reduce((sum, d) => sum + (d.amount - d.paid), 0);
  const totalIOwe = activeDebts
    .filter((d) => d.type === "i_owe")
    .reduce((sum, d) => sum + (d.amount - d.paid), 0);
  const totalCredit = activeDebts
    .filter((d) => d.type === "credit")
    .reduce((sum, d) => sum + (d.amount - d.paid), 0);
  const netBalance = totalOwedToMe - totalIOwe - totalCredit;

  const totalPages = Math.ceil(debts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDebts = debts.slice(startIndex, startIndex + itemsPerPage);

  const navItems = [
    { name: "Dashboard", icon: Home, active: false },
    { name: "Transactions", icon: List, active: false },
    { name: "Analytics", icon: BarChart3, active: false },
    { name: "Debt", icon: CreditCard, active: true },
  ];

  const handleSubmit = () => {
    if (!formPerson || !formAmount) return;
    setDebts([
      ...debts,
      {
        id: Date.now(),
        type: formType,
        person: formPerson,
        amount: parseFloat(formAmount),
        paid: 0,
        description: formDesc,
        date: formDate,
      },
    ]);
    setFormType("owed_to_me");
    setFormPerson("");
    setFormAmount("");
    setFormDesc("");
    setFormDate("");
    setShowModal(false);
  };

  const openSettleModal = (debt) => {
    setSelectedDebt(debt);
    setSettleAmount("");
    setShowSettleModal(true);
  };

  const handleSettle = () => {
    if (!settleAmount || !selectedDebt) return;
    const amount = parseFloat(settleAmount);
    const remaining = selectedDebt.amount - selectedDebt.paid;
    if (amount >= remaining) {
      setDebts(
        debts.map((d) =>
          d.id === selectedDebt.id ? { ...d, paid: d.amount, settled: true } : d
        )
      );
    } else {
      setDebts(
        debts.map((d) =>
          d.id === selectedDebt.id ? { ...d, paid: d.paid + amount } : d
        )
      );
    }
    setShowSettleModal(false);
    setSelectedDebt(null);
    setSettleAmount("");
  };

  const removeDebt = (id) => {
    const newDebts = debts.filter((d) => d.id !== id);
    setDebts(newDebts);
    const newTotalPages = Math.ceil(newDebts.length / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0)
      setCurrentPage(newTotalPages);
  };

  const getTypeLabel = (type) => {
    if (type === "owed_to_me")
      return {
        label: "To Receive",
        color: "bg-emerald-500/20 text-emerald-400",
      };
    if (type === "i_owe")
      return { label: "To Pay", color: "bg-rose-500/20 text-rose-400" };
    return { label: "Credit", color: "bg-amber-500/20 text-amber-400" };
  };

  const getSettleButtonText = (type) =>
    type === "owed_to_me" ? "Received" : "Pay";

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-800/95 border-r border-slate-700/50 h-screen transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center gap-3 p-6 border-b border-slate-700/50">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <CreditCard size={20} />
          </div>
          <h2 className="text-xl font-bold">ExpenseFlow</h2>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link to={`/${item.name}`}>
                <button
                  key={item.name}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    item.active
                      ? "bg-indigo-600 text-white"
                      : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </button>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-h-screen overflow-auto">
        <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pr-4 pl-4 pb-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Debt Manager</h1>
                <p className="text-slate-400 text-sm">
                  Track your debts & credits
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium text-sm w-full sm:w-auto"
            >
              <Plus size={16} /> Add Debt
            </button>
          </div>

          {/* Summary cards (responsive grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <div className="bg-green-500 rounded-xl p-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-2">
                <ArrowDownLeft size={20} />
              </div>
              <p className="text-white/80 text-xs">To Receive</p>
              <p className="text-xl sm:text-2xl font-bold">
                ${totalOwedToMe.toLocaleString()}
              </p>
              <p className="text-white/70 text-xs mt-1">
                {activeDebts.filter((d) => d.type === "owed_to_me").length}{" "}
                people owe you
              </p>
            </div>

            <div className="bg-red-500 rounded-xl p-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-2">
                <ArrowUpRight size={20} />
              </div>
              <p className="text-white/80 text-xs">To Repay</p>
              <p className="text-xl sm:text-2xl font-bold">
                ${totalIOwe.toLocaleString()}
              </p>
              <p className="text-white/70 text-xs mt-1">
                You owe {activeDebts.filter((d) => d.type === "i_owe").length}{" "}
                people
              </p>
            </div>

            <div className="bg-cyan-500 rounded-xl p-4">
              <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center mb-2">
                <CreditCard size={20} />
              </div>
              <p className="text-white/80 text-xs">Credit Balance</p>
              <p className="text-xl sm:text-2xl font-bold">
                ${totalCredit.toLocaleString()}
              </p>
              <p className="text-white/70 text-xs mt-1">
                {activeDebts.filter((d) => d.type === "credit").length} credit
                purchases
              </p>
            </div>

            <div className="bg-purple-500 rounded-xl p-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-2">
                <Wallet size={20} />
              </div>
              <p className="text-white/80 text-xs">Net Balance</p>
              <p className="text-xl sm:text-2xl font-bold">
                ${netBalance.toLocaleString()}
              </p>
              <p className="text-white/70 text-xs mt-1">
                {debts.filter((d) => d.settled).length} settled records
              </p>
            </div>
          </div>

          {/* Records container */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="p-4 border-b border-slate-700/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="font-semibold text-lg">All Debt Records</h2>
              <span className="text-sm text-slate-400">
                {debts.length} total records
              </span>
            </div>

            {/* Desktop / tablet table (hidden on small) */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-slate-800 text-left text-sm text-slate-400">
                  <tr>
                    <th className="px-5 py-3 font-medium">Person/Store</th>
                    <th className="px-5 py-3 font-medium">Description</th>
                    <th className="px-5 py-3 font-medium hidden md:table-cell">
                      Type
                    </th>
                    <th className="px-5 py-3 font-medium hidden lg:table-cell">
                      Progress
                    </th>
                    <th className="px-5 py-3 font-medium">Amount</th>
                    <th className="px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {paginatedDebts.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-5 py-10 text-center text-slate-500"
                      >
                        No debt records yet
                      </td>
                    </tr>
                  ) : (
                    paginatedDebts.map((debt) => {
                      const typeInfo = getTypeLabel(debt.type);
                      const remaining = debt.amount - debt.paid;
                      const progress = (debt.paid / debt.amount) * 100 || 0;
                      return (
                        <tr
                          key={debt.id}
                          className={`hover:bg-slate-700/30 transition ${
                            debt.settled ? "opacity-60" : ""
                          }`}
                        >
                          <td className="px-5 py-4 font-medium text-white">
                            <div className="flex items-center gap-2">
                              {debt.settled && (
                                <CheckCircle
                                  size={14}
                                  className="text-emerald-400"
                                />
                              )}
                              {debt.person}
                            </div>
                          </td>
                          <td className="px-5 py-4 text-slate-400">
                            {debt.description}
                          </td>
                          <td className="px-5 py-4 hidden md:table-cell">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}
                            >
                              {typeInfo.label}
                            </span>
                          </td>
                          <td className="px-5 py-4 hidden lg:table-cell">
                            <div className="w-28">
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400">
                                  ${debt.paid}
                                </span>
                                <span className="text-slate-500">
                                  ${debt.amount}
                                </span>
                              </div>
                              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-indigo-500 rounded-full transition-all"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td
                            className={`px-5 py-4 font-semibold ${
                              debt.settled
                                ? "text-slate-500 line-through"
                                : debt.type === "owed_to_me"
                                ? "text-emerald-400"
                                : "text-rose-400"
                            }`}
                          >
                            {debt.type === "owed_to_me" ? "+" : "-"}$
                            {remaining.toLocaleString()}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-16">
                                {!debt.settled ? (
                                  <button
                                    onClick={() => openSettleModal(debt)}
                                    className="px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
                                  >
                                    {getSettleButtonText(debt.type)}
                                  </button>
                                ) : (
                                  <span className="text-xs text-emerald-400 font-medium">
                                    Settled
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() => removeDebt(debt.id)}
                                className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                                title="Delete record"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile list (visible only on small screens) */}
            <div className="block sm:hidden p-4 space-y-3">
              {paginatedDebts.length === 0 ? (
                <div className="text-center text-slate-500 py-6">
                  No debt records yet
                </div>
              ) : (
                paginatedDebts.map((debt) => {
                  const typeInfo = getTypeLabel(debt.type);
                  const remaining = debt.amount - debt.paid;
                  const progress = (debt.paid / debt.amount) * 100 || 0;
                  return (
                    <div
                      key={debt.id}
                      className={`bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 ${
                        debt.settled ? "opacity-60" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            {debt.settled && (
                              <CheckCircle
                                size={14}
                                className="text-emerald-400"
                              />
                            )}
                            <div className="font-semibold">{debt.person}</div>
                          </div>
                          <div className="text-slate-400 text-sm mt-1">
                            {debt.description}
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}
                          >
                            {typeInfo.label}
                          </div>
                          <div
                            className={`font-semibold mt-2 ${
                              debt.type === "owed_to_me"
                                ? "text-emerald-400"
                                : "text-rose-400"
                            }`}
                          >
                            {debt.type === "owed_to_me" ? "+" : "-"}$
                            {remaining.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>${debt.paid}</span>
                          <span>${debt.amount}</span>
                        </div>
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 mt-3">
                        {!debt.settled ? (
                          <button
                            onClick={() => openSettleModal(debt)}
                            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition text-sm"
                          >
                            {getSettleButtonText(debt.type)}
                          </button>
                        ) : (
                          <div className="flex-1 flex items-center justify-center text-emerald-400 font-medium">
                            Settled
                          </div>
                        )}
                        <button
                          onClick={() => removeDebt(debt.id)}
                          className="w-12 p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                          title="Delete record"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer / pagination */}
            <div className="px-5 py-4 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-sm text-slate-400">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, debts.length)} of{" "}
                {debts.length} entries
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                        currentPage === page
                          ? "bg-indigo-600 text-white"
                          : "text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Debt Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl w-full max-w-md border border-slate-700">
            <div className="flex justify-between items-center p-5 border-b border-slate-700">
              <h3 className="font-semibold text-lg">Add New Debt</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-slate-700 rounded-lg transition"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Debt Type
                </label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-white"
                >
                  <option value="owed_to_me">Someone owes me</option>
                  <option value="i_owe">I owe someone</option>
                  <option value="credit">Credit purchase</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Person / Store Name
                </label>
                <input
                  type="text"
                  value={formPerson}
                  onChange={(e) => setFormPerson(e.target.value)}
                  placeholder="Enter name"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-white placeholder-slate-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={formAmount}
                    onChange={(e) => setFormAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-white placeholder-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Description
                </label>
                <input
                  type="text"
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="What's this for?"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-white placeholder-slate-500"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition font-medium mt-2"
              >
                Add Debt Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settle Modal */}
      {showSettleModal && selectedDebt && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700">
            <div className="flex justify-between items-center p-5 border-b border-slate-700">
              <h3 className="font-semibold text-lg">
                {selectedDebt.type === "owed_to_me"
                  ? "Receive Payment"
                  : "Make Payment"}
              </h3>
              <button
                onClick={() => setShowSettleModal(false)}
                className="p-1 hover:bg-slate-700 rounded-lg transition"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm">Settling debt with</p>
                <p className="text-white font-semibold text-lg">
                  {selectedDebt.person}
                </p>
                <div className="flex justify-between mt-3 text-sm">
                  <span className="text-slate-400">Total Amount</span>
                  <span className="text-white">
                    ${selectedDebt.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Already Paid</span>
                  <span className="text-emerald-400">
                    ${selectedDebt.paid.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold mt-2 pt-2 border-t border-slate-600">
                  <span className="text-slate-300">Remaining</span>
                  <span className="text-amber-400">
                    $
                    {(selectedDebt.amount - selectedDebt.paid).toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Amount to{" "}
                  {selectedDebt.type === "owed_to_me" ? "Receive" : "Pay"}
                </label>
                <input
                  type="number"
                  value={settleAmount}
                  onChange={(e) => setSettleAmount(e.target.value)}
                  placeholder="0.00"
                  max={selectedDebt.amount - selectedDebt.paid}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-white placeholder-slate-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setSettleAmount(
                      (selectedDebt.amount - selectedDebt.paid).toString()
                    )
                  }
                  className="flex-1 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 transition text-sm"
                >
                  Full Amount
                </button>
                <button
                  onClick={handleSettle}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium text-sm"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
