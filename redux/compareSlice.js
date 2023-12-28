import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  compareArr: [],
};

if (typeof window !== "undefined") {
  // Check if running on the client side
  const storedCompareArr = sessionStorage.getItem("compareArr");
  initialState.compareArr = storedCompareArr
    ? JSON.parse(storedCompareArr)
    : [];
}

export const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addCarToCompare(state, action) {
      // if car exist in compareArr
      const existCar = state.compareArr.find(
        (carId) => carId._id === action.payload._id
      );
      if (existCar) {
        toast.error("Car already in comparison");
      } else {
        state.compareArr.push(action.payload);
        // Also update sessionStorage when modifying the state
        sessionStorage.setItem("compareArr", JSON.stringify(state.compareArr));
        toast.success("Add car to compare list successfully");
      }
    },
    removeCarFromComparing(state, action) {
      // if car exist in compareArr
      const existCar = state.compareArr.find(
        (carId) => carId._id === action.payload._id
      );
      if (existCar) {
        const removeCar = state.compareArr.filter(
          (carId) => carId._id !== action.payload._id
        );
        toast.success("Car removed from comparison");
        state.compareArr = removeCar;
        // Also update sessionStorage when modifying the state
        sessionStorage.setItem("compareArr", JSON.stringify(removeCar));
      } else {
        toast.error("Somthing went wrong, car not found");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCarToCompare, removeCarFromComparing } = compareSlice.actions;

export default compareSlice.reducer;
