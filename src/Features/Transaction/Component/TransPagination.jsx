import { ChevronLeft, ChevronRight } from "lucide-react";

function TransPagination() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-3 py-3 border-t border-gray-200 bg-gray-50 gap-3">
      <p className="text-gray-600 text-sm">
        Showing 1 to 10 of 50 transactions
      </p>
      <div className="flex gap-2 items-center flex-wrap">
        <button className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2">
          <ChevronLeft size={14} /> Prev
        </button>
        <div className="flex gap-1">
          {[...Array(6)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-2 rounded-lg transition-all ${
                // currentPage === i + 1
                // "bg-blue-500 text-white"
                "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2">
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default TransPagination;
