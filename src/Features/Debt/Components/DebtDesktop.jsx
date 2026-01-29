// export default DebtDesktop;
import { CheckCircle, Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDebt, setSelectedDebt } from "../DebtSlice";

function DebtDesktop({
  getTypeLabel,
  setShowEditModal,
  getSettleButtonText,

  setShowSettleModal,
}) {
  const currentPage = useSelector((state) => state.debt.currentPage);

  const debts = useSelector((state) => state.debt.debts);
  // 3- 1 = 2 * 5 = 10
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDebts = debts.slice(startIndex, startIndex + itemsPerPage);
  const dispatch = useDispatch();

  return (
    <>
      {/* ✅ SIDE SPACING LIKE 2nd IMAGE */}
      <div className="hidden sm:block overflow-x-auto px-4 lg:px-6">
        <table className="w-full min-w-[700px] border-separate border-spacing-y-2">
          <thead className="bg-slate-800 text-left text-sm text-slate-400">
            <tr>
              <th className="px-5 py-3 font-medium rounded-l-lg">
                Person/Store
              </th>
              <th className="px-5 py-3 font-medium">Description</th>
              <th className="px-5 py-3 font-medium hidden md:table-cell">
                Type
              </th>
              <th className="px-5 py-3 font-medium hidden lg:table-cell">
                Progress
              </th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium text-center rounded-r-lg w-[170px]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedDebts.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-5 py-10 text-center text-slate-500"
                >
                  No debt records yet
                </td>
              </tr>
            ) : (
              paginatedDebts.map((debt) => {
                const typeInfo = getTypeLabel(debt.debtType);
                const remaining = debt.amount - debt.paid;
                const progress = (debt.paid / debt.amount) * 100 || 0;

                return (
                  <tr
                    key={debt.id}
                    className={`bg-slate-800/40 hover:bg-slate-700/40 transition rounded-lg ${
                      debt.settled ? "opacity-60" : ""
                    }`}
                  >
                    {/* Person */}
                    <td className="px-5 py-4 font-medium text-white rounded-l-lg">
                      <div className="flex items-center gap-2">
                        {debt.settled && (
                          <CheckCircle size={14} className="text-emerald-400" />
                        )}
                        {debt.debtName}
                      </div>
                    </td>

                    {/* Description */}
                    <td className="px-5 py-4 text-slate-400">
                      {debt.description}
                    </td>

                    {/* Type */}
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}
                      >
                        {typeInfo.label}
                      </span>
                    </td>

                    {/* Progress */}
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <div className="w-28">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">${debt.paid}</span>
                          <span className="text-slate-500">${debt.amount}</span>
                        </div>
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Amount */}
                    <td
                      className={`px-5 py-4 font-semibold ${
                        debt.settled
                          ? "text-slate-500 line-through"
                          : debt.debtType === "owed_to_me"
                            ? "text-emerald-400"
                            : "text-rose-400"
                      }`}
                    >
                      {debt.debtType === "owed_to_me" ? "+" : "-"}$
                      {remaining.toLocaleString()}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 rounded-r-lg">
                      <div className="grid grid-cols-[90px_32px_32px] items-center justify-center gap-2">
                        {!debt.settled ? (
                          <button
                            onClick={() => {
                              dispatch(setSelectedDebt(debt));
                              setShowSettleModal(true);
                            }}
                            className="px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-700 rounded-lg transition text-center"
                          >
                            {getSettleButtonText(debt.debtType)}
                          </button>
                        ) : (
                          <span className="text-xs text-emerald-400 font-medium text-center">
                            Settled
                          </span>
                        )}

                        <button
                          className="p-2 text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition"
                          title="Edit record"
                          onClick={() => {
                            setShowEditModal(true);
                            dispatch(setSelectedDebt(debt));
                          }}
                        >
                          <Edit size={14} />
                        </button>

                        <button
                          onClick={() => {
                            dispatch(deleteDebt(debt));
                          }}
                          className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                          title="Delete record"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DebtDesktop;
