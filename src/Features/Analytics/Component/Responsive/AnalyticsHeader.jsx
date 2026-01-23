import { Calendar, ChevronDown, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTransactionBtn from "../../../../Components/AddTransactionBtn";
import { setAnalyticsDateFilter } from "../../../addTransactionModel/TransactionSlice";

function AnalyticsHeader({ sidebarOpen, setSidebarOpen, setShowAddModal }) {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.list);

  // Months that have transactions (STRING only)
  const monthsWithTransactions = [
    ...new Set(
      transactions.map((txn) => {
        const date = new Date(txn.date);
        return new Date(date.getFullYear(), date.getMonth()).toLocaleString(
          "en-US",
          { month: "short", year: "numeric" },
        );
      }),
    ),
  ];

  const [selectedMonth, setSelectedMonth] = useState("");
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  // Set default month safely
  useEffect(() => {
    if (monthsWithTransactions.length > 0 && !selectedMonth) {
      const firstMonth = monthsWithTransactions[0];
      setSelectedMonth(firstMonth);
      dispatch(setAnalyticsDateFilter(firstMonth));
    }
  }, [monthsWithTransactions, selectedMonth, dispatch]);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      {/* Left text */}
      <div className="text-center md:text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
          Analytics
        </h1>
        <p className="text-gray-400 text-sm">Track your spending patterns</p>
      </div>

      {/* Right section */}
      {transactions.length > 0 && (
        <div className="flex items-center gap-4">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden bg-slate-800 hover:bg-slate-700 p-2 rounded-md border border-slate-700"
            >
              <Menu className="w-5 h-5 text-blue-400" />
            </button>
          )}

          {/* Date Filter */}
          <div className="relative">
            <button
              onClick={() => setShowMonthPicker(!showMonthPicker)}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-md border border-slate-700 text-sm font-medium"
            >
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>{String(selectedMonth)}</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform ${
                  showMonthPicker ? "rotate-180" : ""
                }`}
              />
            </button>

            {showMonthPicker && (
              <div className="absolute top-full mt-1 w-36 bg-slate-800 border border-slate-700 rounded-md shadow-xl z-50">
                {monthsWithTransactions.map((month) => (
                  <button
                    key={month}
                    onClick={() => {
                      setSelectedMonth(month);
                      dispatch(setAnalyticsDateFilter(month));
                      setShowMonthPicker(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-sm hover:bg-slate-700 ${
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

          <AddTransactionBtn setShowAddModal={setShowAddModal} />
        </div>
      )}

      {transactions.length === 0 && (
        <AddTransactionBtn setShowAddModal={setShowAddModal} />
      )}
    </div>
  );
}

export default AnalyticsHeader;
