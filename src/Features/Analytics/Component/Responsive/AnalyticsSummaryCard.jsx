import { TrendingDown, TrendingUp } from "lucide-react";

function AnalyticsSummaryCard({
  currentData,
  previousData,
  previousMonth,
  savingsRate,
  highestCategory,
  savings,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
      {/* Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-3 md:p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-blue-100 text-xs md:text-sm mb-1">Total Spent</p>
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
          <span className="font-semibold">{savingsRate}%</span> of your income
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
  );
}

export default AnalyticsSummaryCard;
