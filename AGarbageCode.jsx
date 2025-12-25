{
  /* <div className="hidden sm:block overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-slate-800 text-left text-sm text-slate-400">
                  <tr>
                    <th className="px-5 py-3 font-medium">Person/Store</th>
                    <th className="px-5 py-3 font-medium">Description</th>
                    <th className="px-5 py-3 font-medium hidden md:table-cell">
                      Type
                    </th>
                    <th className="px-5 py-3 font-medium hidden lg:table-cell">
                      Progress
                    </th>
                    <th className="px-5 py-3 font-medium">Amount</th>
                    <th className="px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
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
                      const typeInfo = getTypeLabel(debt.type);
                      const remaining = debt.amount - debt.paid;
                      const progress = (debt.paid / debt.amount) * 100 || 0;
                      return (
                        <tr
                          key={debt.id}
                          className={`hover:bg-slate-700/30 transition ${
                            debt.settled ? "opacity-60" : ""
                          }`}
                        >
                          <td className="px-5 py-4 font-medium text-white">
                            <div className="flex items-center gap-2">
                              {debt.settled && (
                                <CheckCircle
                                  size={14}
                                  className="text-emerald-400"
                                />
                              )}
                              {debt.person}
                            </div>
                          </td>
                          <td className="px-5 py-4 text-slate-400">
                            {debt.description}
                          </td>
                          <td className="px-5 py-4 hidden md:table-cell">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}
                            >
                              {typeInfo.label}
                            </span>
                          </td>
                          <td className="px-5 py-4 hidden lg:table-cell">
                            <div className="w-28">
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400">
                                  ${debt.paid}
                                </span>
                                <span className="text-slate-500">
                                  ${debt.amount}
                                </span>
                              </div>
                              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-indigo-500 rounded-full transition-all"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td
                            className={`px-5 py-4 font-semibold ${
                              debt.settled
                                ? "text-slate-500 line-through"
                                : debt.type === "owed_to_me"
                                ? "text-emerald-400"
                                : "text-rose-400"
                            }`}
                          >
                            {debt.type === "owed_to_me" ? "+" : "-"}$
                            {remaining.toLocaleString()}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-16">
                                {!debt.settled ? (
                                  <button
                                    onClick={() => openSettleModal(debt)}
                                    className="px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
                                  >
                                    {getSettleButtonText(debt.type)}
                                  </button>
                                ) : (
                                  <span className="text-xs text-emerald-400 font-medium">
                                    Settled
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() => removeDebt(debt.id)}
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
            </div> */
}
{
  /* <div className="block sm:hidden p-4 space-y-3">
              {paginatedDebts.length === 0 ? (
                <div className="text-center text-slate-500 py-6">
                  No debt records yet
                </div>
              ) : (
                paginatedDebts.map((debt) => {
                  const typeInfo = getTypeLabel(debt.type);
                  const remaining = debt.amount - debt.paid;
                  const progress = (debt.paid / debt.amount) * 100 || 0;
                  return (
                    <div
                      key={debt.id}
                      className={`bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 ${
                        debt.settled ? "opacity-60" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            {debt.settled && (
                              <CheckCircle
                                size={14}
                                className="text-emerald-400"
                              />
                            )}
                            <div className="font-semibold">{debt.person}</div>
                          </div>
                          <div className="text-slate-400 text-sm mt-1">
                            {debt.description}
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}
                          >
                            {typeInfo.label}
                          </div>
                          <div
                            className={`font-semibold mt-2 ${
                              debt.type === "owed_to_me"
                                ? "text-emerald-400"
                                : "text-rose-400"
                            }`}
                          >
                            {debt.type === "owed_to_me" ? "+" : "-"}$
                            {remaining.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>${debt.paid}</span>
                          <span>${debt.amount}</span>
                        </div>
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 mt-3">
                        {!debt.settled ? (
                          <button
                            onClick={() => openSettleModal(debt)}
                            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition text-sm"
                          >
                            {getSettleButtonText(debt.type)}
                          </button>
                        ) : (
                          <div className="flex-1 flex items-center justify-center text-emerald-400 font-medium">
                            Settled
                          </div>
                        )}
                        <button
                          onClick={() => removeDebt(debt.id)}
                          className="w-12 p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                          title="Delete record"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div> */
}
