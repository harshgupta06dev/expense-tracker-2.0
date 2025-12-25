import { ChevronLeft, ChevronRight } from "lucide-react";

function DebtFooter({
  startIndex,
  itemsPerPage,
  debts,
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  return (
    <div className="px-5 py-4 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-sm text-slate-400">
        Showing {startIndex + 1} to{" "}
        {Math.min(startIndex + itemsPerPage, debts.length)} of {debts.length}{" "}
        entries
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft size={16} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
              currentPage === page
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-700"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default DebtFooter;
