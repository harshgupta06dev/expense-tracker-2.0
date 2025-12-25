import { Edit2, Trash2 } from "lucide-react";

function TransMobileList({ currentTransactions, formatDate }) {
  return (
    <div className="md:hidden p-3 space-y-3">
      {currentTransactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No transactions found
        </div>
      ) : (
        currentTransactions.map((t) => (
          <div
            key={t.id}
            className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex items-start justify-between"
          >
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500">{formatDate(t.date)}</div>
              <div className="font-medium text-gray-800 truncate">{t.name}</div>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    t.type === "income"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {t.type}
                </span>
                <span className="text-gray-500 truncate">{t.category}</span>
              </div>
            </div>
            <div className="ml-3 flex flex-col items-end gap-2">
              <div className="font-semibold text-sm whitespace-nowrap">
                ${t.amount.toLocaleString()}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => console.log("Edit", t.id)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => console.log("Delete", t.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TransMobileList;
