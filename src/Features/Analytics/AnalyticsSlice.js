import { createSelector } from "@reduxjs/toolkit";

export function monthNameToNumber(monthName) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months.indexOf(monthName);
}
export const getLast6Months = createSelector(
  [(state) => state.transactions.analyticsDateFilter],
  (analyticsDateFilter) => {
    if (!analyticsDateFilter) return [];
    const months = [];
    const [month, year] = analyticsDateFilter.split(" ");
    const monthNumber = monthNameToNumber(month);
    for (let i = 0; i < 6; i++) {
      const date = new Date(year, monthNumber - i, 1);

      months.push({
        year: date.getFullYear(),
        month: date.getMonth(), // 0 = Jan
        label: date.toLocaleString("default", { month: "short" }),
      });
    }

    return months.reverse(); // old → new
  },
);
export function filterTransactionsByMonths(transactions, months) {
  return transactions.filter((tx) => {
    const txDate = new Date(tx.date);

    return months.some(
      (m) => txDate.getFullYear() === m.year && txDate.getMonth() === m.month,
    );
  });
}
export function buildSpendingTrends(transactions, months) {
  return months.map((m) => {
    let income = 0;
    let expense = 0;

    transactions.forEach((tx) => {
      const txDate = new Date(tx.date);

      if (txDate.getFullYear() === m.year && txDate.getMonth() === m.month) {
        if (tx.type === "Income") {
          income += tx.amount;
        } else {
          expense += tx.amount;
        }
      }
    });

    return {
      month: m.label,
      income,
      expense,
    };
  });
}
