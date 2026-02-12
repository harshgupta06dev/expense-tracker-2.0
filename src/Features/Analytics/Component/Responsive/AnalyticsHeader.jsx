import { Calendar, ChevronDown, Menu } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTransactionBtn from "../../../../Components/AddTransactionBtn";
import { setAnalyticsDateFilter } from "../../../addTransactionModel/TransactionSlice";

function AnalyticsHeader({ sidebarOpen, setSidebarOpen, setShowAddModal }) {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.list);

  const monthsWithTransactions = useMemo(() => {
    return [
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
  }, [transactions]);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  useEffect(() => {
    if (monthsWithTransactions.length > 0 && !selectedMonth) {
      const firstMonth = monthsWithTransactions[0];
      setSelectedMonth(firstMonth);
      dispatch(setAnalyticsDateFilter(firstMonth));
    }
  }, [monthsWithTransactions, selectedMonth, dispatch]);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      {/* Left Text Section */}
      <div className="text-center md:text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
          Analytics
        </h1>
        <p className="text-gray-400 text-sm">Track your spending patterns</p>
      </div>

      {transactions.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
          {/* Mobile Top Row: Menu + Date Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden bg-slate-800 hover:bg-slate-700 p-2 rounded-md border border-slate-700"
              >
                <Menu className="w-5 h-5 text-blue-400" />
              </button>
            )}

            {/* Date Filter - CENTERED TEXT */}
            <div className="relative flex-1 sm:flex-none">
              <button
                onClick={() => setShowMonthPicker(!showMonthPicker)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-md border border-slate-700 text-sm font-medium"
              >
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-center">{String(selectedMonth)}</span>

                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    showMonthPicker ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showMonthPicker && (
                <div className="absolute top-full mt-1 w-full sm:w-36 bg-slate-800 border border-slate-700 rounded-md shadow-xl z-50">
                  {monthsWithTransactions.map((month) => (
                    <button
                      key={month}
                      onClick={() => {
                        setSelectedMonth(month);
                        dispatch(setAnalyticsDateFilter(month));
                        setShowMonthPicker(false);
                      }}
                      className={`w-full text-center px-3 py-2 text-sm hover:bg-slate-700 ${
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

          {/* Add Button - CENTERED ON MOBILE */}
          <div className="w-full sm:w-auto flex justify-center sm:justify-start">
            <AddTransactionBtn setShowAddModal={setShowAddModal} />
          </div>
        </div>
      )}

      {/* If No Transactions - Also Centered */}
      {transactions.length === 0 && (
        <div className="flex justify-center md:justify-start w-full">
          <AddTransactionBtn setShowAddModal={setShowAddModal} />
        </div>
      )}
    </div>
  );
}

export default AnalyticsHeader;
