import { Plus } from "lucide-react";

function AddTransactionBtn({ setShowAddModal }) {
  return (
    <button
      onClick={() => setShowAddModal(true)}
      className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 whitespace-nowrap"
      aria-label="Add transaction"
    >
      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="text-sm sm:text-base">Add Transaction</span>
    </button>
  );
}

export default AddTransactionBtn;
