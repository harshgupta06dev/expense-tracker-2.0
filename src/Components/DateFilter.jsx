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
function DateFilters({ allVarientColor }) {
  console.log(allVarientColor);
  return (
    <div className="inline-block relative">
      <details className="relative">
        <summary
          className={
            allVarientColor === "slate"
              ? `list-none cursor-pointer flex items-center gap-2 px-3 py-2 border border-slate-600 rounded-lg hover:bg-slate-600 transition-all text-sm min-w-[180px] select-none bg-slate-700 text-amber-50`
              : `list-none cursor-pointer flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all text-sm min-w-[180px] select-none`
          }
        >
          {/* Funnel icon */}
          <Filter size={14} />

          <span className="hidden sm:inline">Filter by date</span>

          <div className="flex-1" />

          {/* Chevron */}
          <ChevronDown size={14} />
        </summary>

        {/* Dropdown panel — styled like your first image */}
        <div
          className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden"
          role="menu"
        >
          {/* Selected item style (blue) */}
          <button
            type="button"
            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-all text-blue-600 bg-blue-50"
          >
            All Time
          </button>

          {/* Other items */}
          <button
            type="button"
            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-all text-gray-700"
          >
            Today
          </button>
          <button
            type="button"
            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-all text-gray-700"
          >
            Yesterday
          </button>
          <button
            type="button"
            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-all text-gray-700"
          >
            Last 7 days
          </button>

          <button
            type="button"
            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-all text-gray-700"
          >
            This Month
          </button>

          <button
            type="button"
            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-all text-gray-700 rounded-b-lg"
          >
            This Year
          </button>
        </div>
      </details>
    </div>
  );
}

export default DateFilters;
