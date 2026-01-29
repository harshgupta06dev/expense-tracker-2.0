import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../Features/addTransactionModel/TransactionSlice";
import debtReducer from "../Features/Debt/DebtSlice";
export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    debt: debtReducer,
  },
});
//
// more responsive to the smaller device.
// add local storage to store data.
// optional add theme version.
// try the appp for 15 days and see where it need more improvement.
