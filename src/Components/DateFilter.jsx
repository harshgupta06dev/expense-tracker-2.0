import { Calendar } from "lucide-react";

// function DateFilter({ dateFilter, setDateFilter, colorBg }) {
//   return (
//     <div className="hidden sm:block">
//       <div className="relative w-48 md:w-64">
//         <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
//         <select
//           value={dateFilter}
//           onChange={(e) => setDateFilter(e.target.value)}
//           className="pl-10 pr-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-600 appearance-none cursor-pointer font-medium text-sm w-full min-w-0"
//         >
//           <option value="all">All Time</option>
//           <option value="today">Today</option>
//           <option value="yesterday">Yesterday</option>
//           <option value="this-week">Last 7 Days</option>
//           <option value="this-month">This Month</option>
//           <option value="this-year">This Year</option>
//         </select>
//       </div>
//     </div>
//   );
// }

// export default DateFilter;
import { ChevronDown, Filter } from "lucide-react";
import { useState } from "react";
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

function DateFilters({ allVarientColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.transactions.dateFilter);

  const selectedLabel = OPTIONS.find((o) => o.value === filter)?.label;

  return (
    <div className="relative inline-block">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={
          allVarientColor === "slate"
            ? "flex items-center gap-2 px-3 py-2 border border-slate-600 rounded-lg bg-slate-700 text-amber-50 hover:bg-slate-600 text-sm min-w-[180px]"
            : "flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm min-w-[180px]"
        }
      >
        <Filter size={14} />

        {/* 👇 label logic */}
        <span className="hidden sm:inline">{selectedLabel}</span>

        <div className="flex-1" />
        <ChevronDown size={14} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
          {OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                dispatch(setDateFilter(option.value)); // 👈 Redux update
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm transition-all
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
      )}
    </div>
  );
}

export default DateFilters;
