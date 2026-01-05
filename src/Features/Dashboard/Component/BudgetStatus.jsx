import { DollarSign, Edit, Plus } from "lucide-react";
import { getDaysLeft, selectTotalExpense } from "../DashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredBudgetTransactisons,
  setBudgetMode,
} from "../../addTransactionModel/TransactionSlice";

function BudgetStatus({ setShowBudgetModal }) {
  const dispatch = useDispatch();
  const handleEdit = function () {
    dispatch(setBudgetMode("edit"));
    setShowBudgetModal(true);
  };
  const handleAdd = function () {
    dispatch(setBudgetMode("add"));
    setShowBudgetModal(true);
    isOverBudget = false;
  };
  // ===== Redux State =====
  const budget = useSelector((state) => state.transactions.budgetList);
  const transactions = useSelector(selectFilteredBudgetTransactisons);
  const totalExpenses = useSelector((state) =>
    selectTotalExpense(state, transactions)
  );

  // ===== Budget Exists? =====
  const hasBudget = !!budget && budget.amount > 0;

  // ===== Safe Defaults =====
  const budgetLimit = hasBudget ? budget.amount : 0;
  const rawBudgetUsed = totalExpenses;
  const timePeriod = budget?.timePeriod;
  const daysLeft = hasBudget ? getDaysLeft(timePeriod) : null;

  // ===== Overspend Detection =====
  let isOverBudget = hasBudget && rawBudgetUsed > budgetLimit;
  console.log("isoverBudget", isOverBudget);
  const overspentAmount = isOverBudget ? rawBudgetUsed - budgetLimit : 0;
  // ===== Calculations =====
  const budgetUsed = hasBudget ? rawBudgetUsed : 0;

  const budgetPercentage = hasBudget
    ? Math.round((rawBudgetUsed / budgetLimit) * 100)
    : 0;

  // Clamp ring to 100% when overspent
  const ringPercentage = isOverBudget ? 100 : Math.min(budgetPercentage, 100);

  const budgetRemaining = hasBudget
    ? Math.max(budgetLimit - rawBudgetUsed, 0)
    : 0;

  return (
    <div className="relative col-span-12 lg:col-span-4 bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-slate-700">
      {/* ===== DISABLED OVERLAY ===== */}
      {!hasBudget && (
        <div className="absolute inset-0 z-10 bg-slate-900/70 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center text-center px-4">
          <p className="text-white font-semibold text-lg">No Budget Set</p>
          <p className="text-slate-400 text-sm mt-1">
            Add a budget to start tracking expenses
          </p>
        </div>
      )}

      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between mb-2 relative z-20">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-blue-400" />
          Budget Status
        </h2>
        {!hasBudget || overspentAmount ? (
          <button
            onClick={handleAdd}
            className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-1.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-1.5 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add {isOverBudget && "new"} Budget
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-1.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-1.5 text-sm"
          >
            <Edit className="w-4 h-4" />
            Edit Budget
          </button>
        )}
      </div>

      {/* ===== CONTENT ===== */}
      <div
        className={`space-y-4 min-h-[280px] flex flex-col justify-between ${
          !hasBudget ? "pointer-events-none opacity-60" : ""
        }`}
      >
        {/* ===== CIRCULAR STATUS ===== */}
        {hasBudget && (
          <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-linear-to-br from-slate-700 to-slate-800 rounded-xl">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-3">
              <svg
                viewBox="0 0 112 112"
                className="w-full h-full transform -rotate-90"
              >
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="#334155"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke={
                    isOverBudget
                      ? "#ef4444"
                      : ringPercentage > 60
                      ? "#f59e0b"
                      : "#22c55e"
                  }
                  strokeWidth={isOverBudget ? 8 : 10} // 👈 thinner when overspent
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 48}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 48 * (1 - ringPercentage / 100)
                  }`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>

              {/* ===== CENTER TEXT ===== */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  {isOverBudget ? (
                    <>
                      <div className="text-xs sm:text-sm font-semibold text-red-400 leading-tight">
                        Over Budget
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-400">
                        Limit exceeded
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-xl sm:text-2xl font-bold text-white">
                        {ringPercentage}%
                      </div>
                      <div className="text-xs text-slate-400">Budget used</div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-xs text-slate-400 mb-1">
                {timePeriod} Budget Limit
              </div>
              <div className="text-lg sm:text-xl font-bold text-white">
                ${budgetLimit}
              </div>
            </div>
          </div>
        )}

        {/* ===== DETAILS ===== */}
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-slate-700 bg-opacity-50 rounded-lg">
            <span className="text-slate-300 text-sm">Total Spent</span>
            <span className="font-bold text-red-400 text-sm">
              ${budgetUsed}
            </span>
          </div>

          {!isOverBudget && (
            <div className="flex justify-between items-center p-2 bg-slate-700 bg-opacity-50 rounded-lg">
              <span className="text-slate-300 text-sm">Remaining</span>
              <span className="font-bold text-green-400 text-sm">
                ${budgetRemaining}
              </span>
            </div>
          )}

          {isOverBudget ? (
            <>
              <div className="flex justify-between items-center p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                <span className="text-red-300 text-sm">Budget Limit</span>
                <span className="font-bold text-red-400 text-sm">
                  ${budgetLimit}
                </span>
              </div>
              {/* <div className="flex justify-between items-center p-2 bg-slate-700 bg-opacity-50 rounded-lg">
                <span className="text-slate-300 text-sm">Budget Limit</span>
                <span className="font-bold text-slate-200 text-sm">
                  ${budgetLimit}
                </span>
              </div> */}
              {/* <div className="flex justify-between items-center p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                <span className="text-red-300 text-sm">Overspent</span>
                <span className="font-bold text-red-400 text-sm">
                  ${overspentAmount}
                </span>
              </div> */}
              <div className="flex justify-between items-center p-2 bg-slate-700 bg-opacity-50 rounded-lg">
                <span className="text-slate-300 text-sm">Overspent</span>
                <span className="font-bold text-red-400 text-sm">
                  ${overspentAmount}
                </span>
              </div>
            </>
          ) : (
            <div className="flex justify-between items-center p-2 bg-linear-to-r from-blue-500 to-blue-600 rounded-lg">
              <span className="text-blue-50 text-sm">Days Left</span>
              <span className="font-bold text-white text-sm">
                {daysLeft} days
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BudgetStatus;
