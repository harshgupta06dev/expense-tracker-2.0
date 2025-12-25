import {
  DollarSign,
  LucideTrendingUp,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
function SummaryCard() {
  return (
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
        <div className="text-2xl font-bold text-white">${100}</div>
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
        <div className="text-2xl font-bold text-white">${100}</div>
      </div>

      {/* Balance */}
      <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="bg-white/20 p-2 rounded-lg">
            <Wallet className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="text-blue-50 text-xs font-medium mb-1">Balance</div>
        <div className="text-2xl font-bold text-white">${100}</div>
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
        <div className="text-2xl font-bold text-white">${12}</div>
      </div>
    </div>
  );
}

export default SummaryCard;
