export const selectTransactions = (state) => state.transactions.list;
// export const selectBudgetTransactions = useSelector(
//   selectFilteredBudgetTransactisons
// );
export const selectTotalIncome = (state) =>
  state.transactions.list
    .filter((tx) => tx.type === "Income")
    .reduce((sum, tx) => sum + tx.amount, 0);

export const selectTotalExpense = (state, transactions = null) => {
  const list = transactions ?? state.transactions.list;

  return list
    .filter((tx) => tx.type === "Expense")
    .reduce((sum, tx) => sum + tx.amount, 0);
};

// export const selectTotalExpense = (state) =>
//   state.transactions.list
//     .filter((tx) => tx.type === "Expense")
//     .reduce((sum, tx) => sum + tx.amount, 0);

export const selectBalance = (state) => {
  const income = state.transactions.list
    .filter((tx) => tx.type === "Income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const expense = state.transactions.list
    .filter((tx) => tx.type === "Expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  return income - expense;
};

export const selectAvgDailyExpense = (state) => {
  const expenses = state.transactions.list.filter(
    (tx) => tx.type === "Expense"
  );

  if (expenses.length === 0) return 0;

  const totalExpense = expenses.reduce((sum, tx) => sum + tx.amount, 0);

  const uniqueDays = new Set(expenses.map((tx) => tx.date)).size;

  return Math.round(totalExpense / uniqueDays);
};

export const getDaysLeft = (timePeriod) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let endDate;

  switch (timePeriod) {
    case "weekly": {
      const day = today.getDay(); // 0 = Sunday
      const diff = day === 0 ? 0 : 7 - day;
      endDate = new Date(today);
      endDate.setDate(today.getDate() + diff);
      break;
    }

    case "monthly": {
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      break;
    }

    case "yearly": {
      endDate = new Date(today.getFullYear(), 11, 31);
      break;
    }

    default:
      return null;
  }

  const diffTime = endDate - today;
  return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);
};
