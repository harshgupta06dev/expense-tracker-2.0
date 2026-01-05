import AddTransactionBtn from "./AddTransactionBtn";

function EmptyCardState({ setShowAddModal }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {/* Inner box */}
      <div className="flex flex-col items-center text-center px-6 py-8 max-w-sm">
        {/* Icon */}
        <div className="mb-5 rounded-2xl bg-slate-700/40 p-5 shadow-inner">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            className="text-blue-400"
          >
            <path
              d="M3 3v18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <rect x="7" y="12" width="3" height="6" fill="currentColor" />
            <rect x="12" y="9" width="3" height="9" fill="currentColor" />
            <rect x="17" y="6" width="3" height="12" fill="currentColor" />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-slate-200">
          No expenses yet
        </h3>

        {/* Subtitle */}
        <p className="mt-2 text-sm text-slate-400 leading-relaxed">
          Add your first expense to see category-wise spending insights.
        </p>

        {/* CTA */}
        <div className="mt-6">
          <AddTransactionBtn setShowAddModal={setShowAddModal} />
        </div>
      </div>
    </div>
  );
}

export default EmptyCardState;
