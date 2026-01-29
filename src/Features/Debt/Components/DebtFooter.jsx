import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentPageOfPag } from "../DebtSlice";

function DebtFooter() {
  const dispatch = useDispatch();
  const debts = useSelector((state) => state.debt.debts);

  const totalDebts = debts.length;
  const totalPages = Math.ceil(totalDebts / 5);
  const [currentPage, setCurrentPage] = useState(1);
  if (debts.length === 0) return;
  return (
    <div className="px-5 py-4 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-sm text-slate-400">
        Showing {totalDebts >= 5 ? 5 : totalDebts} transactions{" "}
        {totalDebts >= 5 ? "per page" : ""} out of {totalDebts} total
      </p>
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          onClick={() => {
            if (currentPage > 1) {
              const newPage = currentPage - 1;
              setCurrentPage(newPage);
              dispatch(currentPageOfPag(newPage));
            }
          }}
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => {
              setCurrentPage(page);
              dispatch(currentPageOfPag(page));
            }}
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
          className="p-2 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          onClick={() => {
            if (currentPage < totalPages) {
              const newPage = currentPage + 1;
              setCurrentPage(newPage);
              dispatch(currentPageOfPag(newPage));
            }
          }}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default DebtFooter;
