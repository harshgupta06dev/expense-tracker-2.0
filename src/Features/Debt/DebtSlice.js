import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  debts: [], // all debt records
  selectedDebt: null,
  currentPage: 1,
};

const debtSlice = createSlice({
  name: "debt",
  initialState,
  reducers: {
    addDebt: (state, action) => {
      state.debts.push(action.payload);
    },

    deleteDebt: (state, action) => {
      console.log(action.payload.id);

      state.debts = state.debts.filter((debt) => debt.id !== action.payload.id);
    },
    currentPageOfPag: (state, action) => {
      state.currentPage = action.payload;
    },

    setSelectedDebt: (state, action) => {
      state.selectedDebt = action.payload;
    },

    settleDebt: (state, action) => {
      const { id, amount } = action.payload;

      const debt = state.debts.find((d) => d.id === id);
      if (!debt) return;

      debt.paid += amount;

      if (debt.paid >= debt.amount) {
        debt.paid = debt.amount;
        debt.settled = true;
      }
    },

    // ✅ NEW: Update Debt (Edit Modal)
    updateDebt: (state, action) => {
      const { id, amount, description } = action.payload;

      const debt = state.debts.find((d) => d.id === id);
      if (!debt) return;

      // Only editable fields
      debt.amount = amount;
      debt.description = description;
    },
  },
});

export const {
  addDebt,
  deleteDebt,
  setSelectedDebt,
  settleDebt,
  updateDebt, // ✅ export added
  currentPageOfPag,
} = debtSlice.actions;

export default debtSlice.reducer;
