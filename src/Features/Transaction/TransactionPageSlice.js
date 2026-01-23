// import { createSlice } from "@reduxjs/toolkit";

// const transactionPageSlice = createSlice({
//   name: "transactionsPage",
//   initialState: {
//     list: [],
//   },
//   reducers: {
//     addTransaction: (state, action) => {
//       state.list.push(action.payload);
//     },
//   },
// });
// export const selectFilteredTransactions = (state) => {
//   const { list, typeFilter } = state.transactions;
//   console.log("this is list", list);

//   if (typeFilter === "income") {
//     return list.filter((t) => t.type === "income");
//   }

//   if (typeFilter === "expense") {
//     return list.filter((t) => t.type === "expense");
//   }

//   return list; // all
// };
