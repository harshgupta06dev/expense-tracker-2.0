import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { setTransactionMode } from "../Features/addTransactionModel/TransactionSlice";

function AddTransactionBtn({ setShowAddModal }) {
  const dispatch = useDispatch();
  function handleAdd() {
    dispatch(setTransactionMode("add"));
    setShowAddModal(true);
  }
  return (
    <button
      onClick={() => handleAdd()}
      className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 whitespace-nowrap"
      aria-label="Add transaction"
    >
      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="text-sm sm:text-base">Add Transaction</span>
    </button>
  );
}

export default AddTransactionBtn;
