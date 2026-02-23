import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    list: [],
    budgetList: null,
    budgetMode: "add",
    dateFilter: "all",

    typeFilter: "all",
    searchTerm: "",
    transactionMode: "add",
    updateTransaction: null,
    currentPage: 1,

    // analytics
    analyticsDateFilter: "",
    analyticsCurrentData: [],
    analyticsPrevTransaction: [],
  },
  reducers: {
    addTransaction: (state, action) => {
      state.list.push(action.payload);
    },
    updateTransaction: (state, action) => {
      const index = state.list.findIndex((tx) => tx.id === action.payload.id);

      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteTransaction: (state, action) => {
      console.log(action);
      state.list = state.list.filter((tx) => tx.id !== action.payload);
    },
    currentPageOfPag: (state, action) => {
      state.currentPage = action.payload;
    },
    addBudget: (state, action) => {
      state.budgetList = action.payload;
    },
    setBudget: (state, action) => {
      state.budgetList = action.payload;
    },
    setBudgetMode: (state, action) => {
      state.budgetMode = action.payload;
    },
    setTransactions: (state, action) => {
      state.list = action.payload;
    },

    setDateFilter: (state, action) => {
      state.dateFilter = action.payload;
    },
    setTypeFilter: (state, action) => {
      state.typeFilter = action.payload; // "income" | "expense"  | "all"
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setTransactionMode: (state, action) => {
      state.transactionMode = action.payload;
    },
    setUpdateTransaction: (state, action) => {
      state.updateTransaction = action.payload;
    },
    setAnalyticsDateFilter: (state, action) => {
      state.analyticsDateFilter = action.payload;
    },
    setAnalyticsCurrentData: (state, action) => {
      state.analyticsCurrentData = action.payload;
    },
    SetAnalyticsPrevTransaction: (state, action) => {
      state.analyticsPrevTransaction = action.payload;
    },
  },
});

export const {
  addTransaction,
  deleteTransaction,
  updateTransaction,
  addBudget,
  currentPageOfPag,
  setBudget,
  setBudgetMode,
  setDateFilter,
  setTypeFilter,
  setSearchTerm,
  setTransactions,
  setTransactionMode,
  setUpdateTransaction,
  setAnalyticsDateFilter,
  setAnalyticsCurrentData,
  SetAnalyticsPrevTransaction,
} = transactionSlice.actions;

export default transactionSlice.reducer;

import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// utils/dateFilter.js
export const isDateInRange = (txDate, filter, today = new Date()) => {
  const date = new Date(txDate);

  today = new Date(today);
  today.setHours(23, 59, 59, 999);

  if (!filter || filter === "all") return true;

  if (filter === "today") {
    return date.toDateString() === today.toDateString();
  }

  if (filter === "yesterday") {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
  }

  if (filter === "last7") {
    const last7 = new Date(today);
    last7.setDate(today.getDate() - 7);
    return date >= last7 && date <= today;
  }

  if (filter === "weekly" || filter === "week") {
    const monday = new Date(today);
    const day = (today.getDay() + 6) % 7;
    monday.setHours(0, 0, 0, 0);
    monday.setDate(monday.getDate() - day);

    const sunday = new Date(monday);
    sunday.setHours(23, 59, 59, 999);
    sunday.setDate(sunday.getDate() + 6);

    return date >= monday && date <= sunday;
  }

  if (filter === "month" || filter === "monthly") {
    return (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  if (filter === "year" || filter === "yearly") {
    return date.getFullYear() === today.getFullYear();
  }

  return true;
};

export const selectFilteredTransactions = createSelector(
  [
    (state) => state.transactions.list,
    (state) => state.transactions.dateFilter,
  ],
  (transactions, filter) =>
    transactions.filter((tx) => isDateInRange(tx.date, filter)),
);

export const selectFilteredBudgetTransactions = createSelector(
  [
    (state) => state.transactions.list,
    (state) => state.transactions.budgetList?.timePeriod,
  ],
  (transactions, filter) =>
    transactions.filter((tx) => isDateInRange(tx.date, filter)),
);
export const selectTypeFilteredTransactions = createSelector(
  [
    (state) => state.transactions.list,
    (state) => state.transactions.typeFilter,
    (state) => state.transactions.searchTerm,
    (state) => state.transactions.dateFilter,
  ],
  (list, typeFilter, searchTerm, dateFilter) => {
    return (
      list
        // 1️⃣ TYPE FILTER
        .filter((t) => {
          if (typeFilter === "income") return t.type === "Income";
          if (typeFilter === "expense") return t.type === "Expense";
          return true;
        })

        // 2️⃣ SEARCH FILTER
        .filter((t) =>
          searchTerm?.trim()
            ? (t.description ?? "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            : true,
        )

        // 3️⃣ DATE FILTER (REUSED 🔥)
        .filter((t) => isDateInRange(t.date, dateFilter))
    );
  },
);

// const selectBudgetTransaction = (state) => state.transactions.list;
// const selectDateFilter = (state) => state.transactions.dateFilter;

// export const selectFilteredTransactions = createSelector(
//   [selectBudgetTransaction, selectDateFilter],
//   (transactions, filter) => {
//     const today = new Date();

//     return transactions.filter((tx) => {
//       const txDate = new Date(tx.date);

//       if (filter === "all") return true;

//       if (filter === "today") {
//         return txDate.toDateString() === today.toDateString();
//       }

//       if (filter === "yesterday") {
//         const yesterday = new Date(today);
//         yesterday.setDate(today.getDate() - 1);
//         return txDate.toDateString() === yesterday.toDateString();
//       }

//       if (filter === "last7") {
//         const last7 = new Date(today);
//         last7.setDate(today.getDate() - 7);
//         console.log(last7);
//         return txDate >= last7 && txDate <= today;
//       }
//       if (filter === "weekly" || filter === "week") {
//         const monday = new Date(today);
//         const day = (today.getDay() + 6) % 7;
//         monday.setDate(monday.getDate() - day);
//         const sunday = new Date(monday); // ✅ create copy
//         sunday.setDate(sunday.getDate() + 6);

//         return txDate >= monday && txDate <= sunday;
//       }

//       if (filter === "month" || filter === "monthly") {
//         return (
//           txDate.getMonth() === today.getMonth() &&
//           txDate.getFullYear() === today.getFullYear()
//         );
//       }

//       if (filter === "year" || filter === "yearly") {
//         return txDate.getFullYear() === today.getFullYear();
//       }

//       return true;
//     });
//   }
// );

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
  },
);
//
export const analyticsFilteredTransaction = createSelector(
  [
    (state) => state.transactions.list,
    (state) => state.transactions.analyticsDateFilter,
  ],
  (transactions, analyticsDateFilter) => {
    // logic here
    const [selectedMonthName, selectedYear] = analyticsDateFilter.split(" ");
    const selectedMonthIndex = new Date(
      `${selectedMonthName} 1, ${selectedYear}`,
    ).getMonth();
    const filteredTransactions = transactions.filter((txn) => {
      const txnDate = new Date(txn.date);

      return (
        txnDate.getFullYear() === Number(selectedYear) &&
        txnDate.getMonth() === selectedMonthIndex
      );
    });
    return filteredTransactions;
  },
);
export const analyticsPreviousMonth = createSelector(
  [
    (state) => state.transactions.list,
    (state) => state.transactions.analyticsDateFilter,
  ],
  (transactions, analyticsDateFilter) => {
    const [month, year] = analyticsDateFilter.split(" ");
    const date = new Date(`${month} 1, ${year}`);
    date.setMonth(date.getMonth() - 1);

    return {
      month: date.getMonth(),
      year: date.getFullYear(),
      label: date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      }),
    };
  },
);
export function getLast6Months(selectedYear, selectedMonth) {
  const months = [];

  for (let i = 0; i < 6; i++) {
    const date = new Date(selectedYear, selectedMonth - i, 1);

    months.push({
      year: date.getFullYear(),
      month: date.getMonth(), // 0 = Jan
      label: date.toLocaleString("default", { month: "short" }),
    });
  }

  return months.reverse(); // old → new
}
