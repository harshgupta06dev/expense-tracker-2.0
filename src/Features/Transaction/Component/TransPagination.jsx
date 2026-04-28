import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { currentPageOfPag } from "../../addTransactionModel/TransactionSlice";
function TransPagination({ transactions }) {
  const dispatch = useDispatch();

  const totalTransactions = transactions.length;
  const totalPages = Math.ceil(totalTransactions / 8);
  // console.log("this is calculation total page", totalPages);
  const [currentPage, setCurrentPage] = useState(1);
  if (transactions.length === 0) return;
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-3 py-3 border-t border-gray-200 bg-gray-50 gap-3">
      <p className="text-gray-600 text-sm">
        Showing {totalTransactions >= 8 ? 8 : totalTransactions} transactions{" "}
        {totalTransactions >= 8 ? "per page" : ""} out of {totalTransactions}{" "}
        total
      </p>
      <div className="flex gap-2 items-center flex-wrap">
        <button
          className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          onClick={() => {
            if (currentPage > 1) {
              const newPage = currentPage - 1;
              setCurrentPage(newPage);
              dispatch(currentPageOfPag(newPage));
            }
          }}
        >
          <ChevronLeft size={14} /> Prev
        </button>
        <div className="flex gap-1">
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;

            return (
              <button
                key={page}
                className={`px-3 py-2 rounded-lg transition-all ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => {
                  setCurrentPage(page);
                  dispatch(currentPageOfPag(page));
                }}
              >
                {page}
              </button>
            );
          })}
        </div>
        <button
          className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          onClick={() => {
            if (currentPage < totalPages) {
              const newPage = currentPage + 1;
              setCurrentPage(newPage);
              dispatch(currentPageOfPag(newPage));
            }
          }}
        >
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default TransPagination;
