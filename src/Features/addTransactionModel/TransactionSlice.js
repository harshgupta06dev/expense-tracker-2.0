import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    list: [],
    budgetList: null,
    budgetMode: "add",
    dateFilter: "all",
  },
  reducers: {
    addTransaction: (state, action) => {
      state.list.push(action.payload);
    },
    addBudget: (state, action) => {
      state.budgetList = action.payload;
    },
    setBudgetMode: (state, action) => {
      state.budgetMode = action.payload;
    },
    setDateFilter: (state, action) => {
      state.dateFilter = action.payload;
    },
  },
});

export const { addTransaction, addBudget, setBudgetMode, setDateFilter } =
  transactionSlice.actions;

export default transactionSlice.reducer;

import { createSelector } from "@reduxjs/toolkit";

const selectBudgetTransaction = (state) => state.transactions.list;
const selectDateFilter = (state) => state.transactions.dateFilter;

export const selectFilteredTransactions = createSelector(
  [selectBudgetTransaction, selectDateFilter],
  (transactions, filter) => {
    const today = new Date();

    return transactions.filter((tx) => {
      const txDate = new Date(tx.date);

      if (filter === "all") return true;

      if (filter === "today") {
        return txDate.toDateString() === today.toDateString();
      }

      if (filter === "yesterday") {
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return txDate.toDateString() === yesterday.toDateString();
      }

      if (filter === "last7") {
        const last7 = new Date(today);
        last7.setDate(today.getDate() - 7);
        console.log(last7);
        return txDate >= last7 && txDate <= today;
      }
      if (filter === "weekly" || filter === "week") {
        const monday = new Date(today);
        const day = (today.getDay() + 6) % 7;
        monday.setDate(monday.getDate() - day);
        const sunday = new Date(monday); // ✅ create copy
        sunday.setDate(sunday.getDate() + 6);

        return txDate >= monday && txDate <= sunday;
      }

      if (filter === "month" || filter === "monthly") {
        return (
          txDate.getMonth() === today.getMonth() &&
          txDate.getFullYear() === today.getFullYear()
        );
      }

      if (filter === "year" || filter === "yearly") {
        return txDate.getFullYear() === today.getFullYear();
      }

      return true;
    });
  }
);

const selectBudgetTransactions = (state) => state.transactions.list;
const selectBudgetDateFilter = (state) =>
  state.transactions.budgetList?.timePeriod;

export const selectFilteredBudgetTransactisons = createSelector(
  [selectBudgetTransactions, selectBudgetDateFilter],
  (transactions, filter) => {
    const today = new Date();

    return transactions.filter((tx) => {
      const txDate = new Date(tx.date);

      if (filter === "all") return true;

      if (filter === "weekly" || filter === "week") {
        const monday = new Date(today);
        const day = (today.getDay() + 6) % 7;
        monday.setHours(0, 0, 0, 0);
        monday.setDate(monday.getDate() - day);

        const sunday = new Date(monday);
        sunday.setHours(23, 59, 59, 999);
        sunday.setDate(sunday.getDate() + 6);

        return txDate >= monday && txDate <= sunday;
      }

      if (filter === "month" || filter === "monthly") {
        return (
          txDate.getMonth() === today.getMonth() &&
          txDate.getFullYear() === today.getFullYear()
        );
      }

      if (filter === "year" || filter === "yearly") {
        return txDate.getFullYear() === today.getFullYear();
      }

      return true;
    });
  }
);
