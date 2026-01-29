import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../Features/addTransactionModel/TransactionSlice";
import debtReducer from "../Features/Debt/DebtSlice";
export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    debt: debtReducer,
  },
});
