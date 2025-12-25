import { DollarSign, Plus } from "lucide-react";

function BudgetStatus({ setShowBudgetModal }) {
  const totalExpenses = 3450;
  const budgetLimit = 5000;
  const budgetUsed = totalExpenses;
  const budgetPercentage = Math.round((budgetUsed / budgetLimit) * 100);
  //   const budgetRemaining = budgetLimit - budgetUsed;
  return (
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
            <div className="text-xs text-slate-400 mb-1">Budget Limit</div>
            <div className="text-lg sm:text-xl font-bold text-white">
              ${100}
            </div>
          </div>
        </div>

        {/* Budget Details */}
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-slate-700 bg-opacity-50 rounded-lg">
            <span className="text-slate-300 text-sm">Spent</span>
            <span className="font-bold text-red-400 text-sm">${100}</span>
          </div>

          <div className="flex justify-between items-center p-2 bg-slate-700 bg-opacity-50 rounded-lg">
            <span className="text-slate-300 text-sm">Remaining</span>
            <span className="font-bold text-green-400 text-sm">${100}</span>
          </div>

          <div className="flex justify-between items-center p-2 bg-linear-to-r from-blue-500 to-blue-600 rounded-lg">
            <span className="text-blue-50 text-sm">Daily Avg</span>
            <span className="font-bold text-white text-sm">${100}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetStatus;
