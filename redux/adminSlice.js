import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: Cookies.get("adminInfo")
      ? JSON.parse(Cookies.get("adminInfo"))
      : null, //convert string to object
  },
  reducers: {
    login(state, action) {
      state.admin = action.payload;
    },
    logout(state, action) {
      state.admin = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  login,
  logout,
} = adminSlice.actions;

export default adminSlice.reducer;
