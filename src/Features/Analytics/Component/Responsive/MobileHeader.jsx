import { Calendar, ChevronDown, Menu, Wallet } from "lucide-react";

function MobileHeader({
  selectedMonth,
  setShowMonthPicker,

  showMonthPicker,
  monthsList,
  setSelectedMonth,
  setSidebarOpen,
}) {
  return (
    <header className="w-full md:hidden bg-slate-800 border-b border-slate-700 p-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          aria-label="Open sidebar"
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-slate-300 p-2 rounded-md hover:bg-slate-700 transition"
        >
          <Menu className="w-6 h-6" />
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
  );
}

export default MobileHeader;
