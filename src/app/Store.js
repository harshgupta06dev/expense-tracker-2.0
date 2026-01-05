import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../Features/addTransactionModel/TransactionSlice";
export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
  },
});
