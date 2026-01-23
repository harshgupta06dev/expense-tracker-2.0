import { HeartPlus, TrendingDown, TrendingUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  analyticsFilteredTransaction,
  analyticsPreviousMonth,
  setAnalyticsCurrentData,
  SetAnalyticsPrevTransaction,
} from "../../../addTransactionModel/TransactionSlice";
import { calculateTotal } from "../../../Dashboard/DashboardSlice";
import { useEffect } from "react";

function AnalyticsSummaryCard({ monthMap }) {
  const dispatch = useDispatch();
  const transactions = useSelector(analyticsFilteredTransaction);
  const expenseTransactions = transactions.filter(
    (tranx) => tranx.type === "Expense",
  );
  console.log(expenseTransactions);
  useEffect(() => {
    dispatch(setAnalyticsCurrentData(transactions));
  }, [dispatch, transactions]);
  // dispatch(setAnalyticsCurrentData(transactions));

  const allTransactions = useSelector((state) => state.transactions.list);
  const categoryIcons = {
    Food: "🍔",
    Housing: "🏠",
    Transport: "🚗",
    Shopping: "🛍️",
    Entertainment: "🎬",
    Healthcare: " ",
  };
  const { label: prevDate } = useSelector((state) =>
    analyticsPreviousMonth(state),
  );

  const [prevMonthLabel, prevYearLabel] = prevDate.split(" ");

  const prevMonth = monthMap[prevMonthLabel]; // number
  const prevYear = Number(prevYearLabel); // number

  const previousTransactions = allTransactions.filter((txn) => {
    const txnDate = new Date(txn.date);

    return (
      txnDate.getMonth() === prevMonth && txnDate.getFullYear() === prevYear
    );
  });
  useEffect(() => {
    dispatch(SetAnalyticsPrevTransaction(previousTransactions));
  }, [dispatch, previousTransactions]);
  // dispatch(SetAnalyticsPrevTransaction(previousTransactions));

  const totalSpent = calculateTotal(transactions, "Expense");
  const totalIncome = calculateTotal(transactions, "Income");
  const prevtotalSpent = calculateTotal(previousTransactions, "Expense");
  const prevtotalIncome = calculateTotal(previousTransactions, "Income");
  const moneySaved = totalIncome - totalSpent;
  const overspent = totalSpent > totalIncome;

  // money saved
  const savingRate =
    totalIncome === 0 ? 0 : ((totalIncome - totalSpent) / totalIncome) * 100;

  const formattedSavingRate = savingRate.toFixed(1);

  const isItHaveIncome = previousTransactions?.filter(
    (txn) => txn.type === "Income",
  );
  const isItHaveExpense = previousTransactions?.filter(
    (txn) => txn.type === "Expense",
  );

  const highestExpenseTransaction = transactions
    .filter((txn) => txn.type === "Expense")
    .reduce((max, txn) => {
      return txn.amount > (max?.amount || 0) ? txn : max;
    }, null);
  const Icon = categoryIcons[highestExpenseTransaction?.category];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-6">
        {/* Total Spent */}
        <div
          className="relative bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl p-5 min-h-[130px] flex flex-col justify-between 
                  shadow-lg shadow-black/10 transition-transform duration-200 hover:-translate-y-0.5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-200 text-[11px] tracking-widest uppercase mb-2">
                Total Income This Month
              </p>
              <p className="text-[26px] font-bold tracking-tight text-white leading-none">
                ₹{totalIncome}
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>

          {previousTransactions.length >= 1 && isItHaveIncome.length !== 0 && (
            <div className="flex items-center gap-2 text-xs text-blue-200">
              <span
                className={`font-semibold ${
                  totalIncome > prevtotalIncome
                    ? "text-green-200"
                    : "text-red-200"
                }`}
              >
                {totalIncome > prevtotalIncome ? "↑" : "↓"}
                {Math.abs(
                  ((totalIncome - prevtotalIncome) / prevtotalIncome) * 100,
                ).toFixed(1)}
                %
              </span>
              <span className="opacity-100">
                vs {prevMonthLabel} {prevYearLabel}
              </span>
            </div>
          )}
        </div>

        {/* Total Spent This Month */}
        <div
          className="relative bg-linear-to-br   from-red-500 to-red-600 rounded-2xl p-5 min-h-[130px] flex flex-col justify-between 
                  shadow-lg shadow-black/10 transition-transform duration-200 hover:-translate-y-0.5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-200 text-[11px] tracking-widest uppercase mb-2">
                Total Spent This Month
              </p>
              <p className="text-[26px] font-bold tracking-tight text-white leading-none">
                ₹{totalSpent}
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>

          {previousTransactions.length >= 1 && isItHaveExpense.length !== 0 && (
            <div className="flex items-center gap-2 text-xs text-blue-200">
              <span
                className={`font-semibold ${
                  totalSpent > prevtotalSpent
                    ? "text-red-200"
                    : "text-green-200"
                }`}
              >
                {totalSpent > prevtotalSpent ? "↑" : "↓"}
                {Math.abs(
                  ((totalSpent - prevtotalSpent) / prevtotalSpent) * 100,
                ).toFixed(1)}
                %
              </span>
              <span className="opacity-70">
                vs {prevMonthLabel} {prevYearLabel}
              </span>
            </div>
          )}
        </div>

        {/* Money Saved */}
        <div
          className={`relative bg-linear-to-br ${
            overspent
              ? "from-orange-500 to-red-600 "
              : "from-green-500 to-green-600 "
          }  rounded-2xl p-5 min-h-[130px] flex flex-col justify-between 
                  shadow-lg shadow-black/10 transition-transform duration-200 hover:-translate-y-0.5`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-green-200 text-[11px] tracking-widest uppercase mb-2">
                Money Saved This Month
              </p>
              <p className="text-[26px] font-bold tracking-tight text-white leading-none">
                ₹{moneySaved}
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl">
              <TrendingDown className="w-5 h-5 text-white" />
            </div>
          </div>
          {transactions.length >= 1 && (
            <p className="text-xs text-green-200 opacity-90">
              <span className="font-semibold">{formattedSavingRate}%</span> of
              income
            </p>
          )}
        </div>

        {/* Highest Expense */}
        <div
          className="relative bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl p-5 min-h-[130px] flex flex-col justify-between 
        shadow-lg shadow-black/10 transition-transform duration-200 hover:-translate-y-0.5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-purple-200 text-[11px] tracking-widest uppercase mb-2">
                Highest Expense This Month
              </p>
              <p className="text-[26px] font-bold tracking-tight text-white leading-none">
                ₹
                {expenseTransactions.length >= 1
                  ? highestExpenseTransaction?.amount
                  : 0}
              </p>
            </div>
            {expenseTransactions.length >= 1 && (
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl text-lg">
                {Icon}
              </div>
            )}
          </div>
          {expenseTransactions.length >= 1 && (
            <p className="text-xs text-purple-200 opacity-90">
              {highestExpenseTransaction?.category} •{" "}
              {((highestExpenseTransaction?.amount / totalSpent) * 100).toFixed(
                1,
              )}
              % of spending
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default AnalyticsSummaryCard;
