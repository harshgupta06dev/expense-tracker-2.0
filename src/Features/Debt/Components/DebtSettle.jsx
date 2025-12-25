import { X } from "lucide-react";

function DebtSettle({
  selectedDebt,
  setShowSettleModal,
  settleAmount,
  setSettleAmount,
  handleSettle,
}) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700">
        <div className="flex justify-between items-center p-5 border-b border-slate-700">
          <h3 className="font-semibold text-lg">
            {selectedDebt.type === "owed_to_me"
              ? "Receive Payment"
              : "Make Payment"}
          </h3>
          <button
            onClick={() => setShowSettleModal(false)}
            className="p-1 hover:bg-slate-700 rounded-lg transition"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <p className="text-slate-400 text-sm">Settling debt with</p>
            <p className="text-white font-semibold text-lg">
              {selectedDebt.person}
            </p>
            <div className="flex justify-between mt-3 text-sm">
              <span className="text-slate-400">Total Amount</span>
              <span className="text-white">
                ${selectedDebt.amount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Already Paid</span>
              <span className="text-emerald-400">
                ${selectedDebt.paid.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm font-semibold mt-2 pt-2 border-t border-slate-600">
              <span className="text-slate-300">Remaining</span>
              <span className="text-amber-400">
                ${(selectedDebt.amount - selectedDebt.paid).toLocaleString()}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Amount to {selectedDebt.type === "owed_to_me" ? "Receive" : "Pay"}
            </label>
            <input
              type="number"
              value={settleAmount}
              onChange={(e) => setSettleAmount(e.target.value)}
              placeholder="0.00"
              max={selectedDebt.amount - selectedDebt.paid}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-white placeholder-slate-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setSettleAmount(
                  (selectedDebt.amount - selectedDebt.paid).toString()
                )
              }
              className="flex-1 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 transition text-sm"
            >
              Full Amount
            </button>
            <button
              onClick={handleSettle}
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium text-sm"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DebtSettle;
