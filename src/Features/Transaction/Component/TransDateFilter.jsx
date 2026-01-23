import { ChevronDown, Filter } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setDateFilter } from "../Features/addTransactionModel/TransactionSlice";

const OPTIONS = [
  { label: "All Time", value: "all" },
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
];

function TransDateFilter({ allVarientColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const filter = "all";

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
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-9999 max-h-80 overflow-y-auto">
          {OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                // dispatch(setDateFilter(option.value));
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

export default TransDateFilter;
