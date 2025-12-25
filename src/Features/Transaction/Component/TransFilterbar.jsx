import { Search } from "lucide-react";
import DateFilters from "../../../Components/DateFilter";

function TransFilterbar({ searchTerm, setSearchTerm }) {
  return (
    <div className="px-3 py-3 md:px-6 md:py-4 border-b border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
        <div className="flex gap-2 flex-wrap">
          <button
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              //   filterType === "all"
              "bg-blue-500 text-white"
              //   "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              //   filterType === "income"
              //     ? "bg-blue-500 text-white"
              "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Income
          </button>
          <button
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              //   filterType === "expense"
              //     ? "bg-blue-500 text-white"
              "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Expense
          </button>
        </div>

        <div className="flex-1 min-w-0">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            />
          </div>
        </div>

        <div className="flex gap-2 md:gap-3 items-center">
          <div className="relative">
            <DateFilters />
          </div>

          <button className="px-2 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all text-sm">
            Export
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransFilterbar;
