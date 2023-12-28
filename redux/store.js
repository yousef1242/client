import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./adminSlice";
import compareSlice from "./compareSlice";

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    compareArr: compareSlice,
  },
});
