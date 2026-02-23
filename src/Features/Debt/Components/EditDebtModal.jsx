import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDebt } from "../DebtSlice"; // create this reducer
import toast from "react-hot-toast";
import { supabase } from "../../../Supabase-Client";
function EditDebtModal({ setShowEditModal }) {
  const dispatch = useDispatch();
  const selectedDebt = useSelector((state) => state.debt.selectedDebt);

  const [amount, setAmount] = useState(selectedDebt?.amount);
  const [description, setDescription] = useState(
    selectedDebt?.description || "",
  );

  const handleSave = async () => {
    if (!amount || amount < selectedDebt?.paid) return;
    const finalData = {
      ...selectedDebt,
      id: selectedDebt?.id,
      amount: Number(amount),
      description,
    };
    const { error } = await supabase
      .from("Debt")
      .update(finalData)
      .eq("id", selectedDebt.id);

    if (error) return console.error(error);
    // console.log("this is what we called final data", finalData);
    dispatch(
      updateDebt({
        id: selectedDebt?.id,
        amount: Number(amount),
        description,
      }),
    );
    toast.success("Debt updated successfully");
    setShowEditModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-700">
          <h3 className="font-semibold text-lg text-white">Edit Debt</h3>
          <button
            onClick={() => {
              toast.error("Debt editing was cancelled.");

              setShowEditModal(false);
            }}
            className="p-1 hover:bg-slate-700 rounded-lg transition"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Info Card */}
          <div className="bg-slate-700/50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Person / Store</span>
              <span className="text-white font-medium">
                {selectedDebt?.debtName}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Type</span>
              <span className="text-slate-300">
                {selectedDebt?.debtType === "owed_to_me"
                  ? "To Receive"
                  : "To Pay"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Already Paid</span>
              <span className="text-emerald-400">${selectedDebt?.paid}</span>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Total Amount
            </label>
            <input
              type="number"
              value={amount}
              min={selectedDebt?.paid}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-white placeholder-slate-500"
            />
            <p className="text-xs text-slate-500 mt-1">
              Amount cannot be less than already paid
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional note"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-white placeholder-slate-500"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => {
                toast.error(" Debt editing was cancelled.");

                setShowEditModal(false);
              }}
              className="flex-1 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 transition text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium text-sm"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditDebtModal;
