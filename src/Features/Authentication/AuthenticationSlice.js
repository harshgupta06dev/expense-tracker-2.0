import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name: "",
  signUp: true,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUserData: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});
export const { addUserData } = authSlice.actions;
export default authSlice.reducer;
