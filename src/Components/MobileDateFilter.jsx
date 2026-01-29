import { X, Filter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setDateFilter } from "../Features/addTransactionModel/TransactionSlice";

const OPTIONS = [
  { label: "All Time", value: "all" },
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This Week", value: "week" },
  { label: "Last 7 days", value: "last7" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
];

function MobileDateFilter({ onClose }) {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.transactions.dateFilter);

  return (
    <div className="fixed inset-0 z-40 bg-black/40 sm:hidden">
      {/* Bottom Sheet */}
      <div className="absolute bottom-0 w-full bg-white rounded-t-2xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2 font-semibold text-gray-800">
            <Filter size={18} />
            Date Filter
          </div>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Options */}
        <div className="py-2">
          {OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                dispatch(setDateFilter(option.value));
                onClose();
              }}
              className={`w-full text-left px-5 py-4 text-sm font-medium transition
                ${
                  filter === option.value
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MobileDateFilter;
