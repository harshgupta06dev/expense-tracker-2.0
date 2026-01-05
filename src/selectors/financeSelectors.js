export const selectFinanceSummary = (state) => {
  const transactions = state.transactions.list;

  let totalIncome = 0;
  let totalExpense = 0;
  const expenseDays = new Set();

  transactions.forEach((tx) => {
    if (tx.type === "Income") {
      totalIncome += tx.amount;
    }

    if (tx.type === "Expense") {
      totalExpense += tx.amount;
      expenseDays.add(tx.date); // YYYY-MM-DD
    }
  });

  const balance = totalIncome - totalExpense;

  const avgDailyExpense =
    expenseDays.size > 0 ? Math.round(totalExpense / expenseDays.size) : 0;

  return {
    totalIncome,
    totalExpense,
    balance,
    avgDailyExpense,
  };
};
