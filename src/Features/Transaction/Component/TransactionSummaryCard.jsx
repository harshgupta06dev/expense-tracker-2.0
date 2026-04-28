import { Filter, TrendingDown, TrendingUp } from "lucide-react";
import { useSelector } from "react-redux";
import {
  selectTotalExpense,
  selectTotalIncome,
} from "../../Dashboard/DashboardSlice";

function SummaryCard({ transactions }) {
  const totalIncome = useSelector(selectTotalIncome);
  const totalExpense = useSelector(selectTotalExpense);

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {[
          {
            icon: TrendingUp,
            title: "Total Income",
            value: `$${totalIncome}`,
            style: "from-green-500 to-green-600",
          },
          {
            icon: TrendingDown,
            title: "Total Expenses",
            value: `$${totalExpense}`,
            style: "from-red-500 to-red-600",
          },
          {
            icon: Filter,
            title: "Filtered Results",
            value: `${transactions.length}`,
            style: "from-blue-500 to-blue-600",
          },
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`rounded-2xl p-4 shadow-xl bg-linear-to-br ${card.style} flex flex-col justify-between`}
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
  );
}

export default SummaryCard;
