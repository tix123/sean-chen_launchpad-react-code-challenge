import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    message: "",
    severity: "error",
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setSeverity: (state, action) => {
      state.severity = action.payload;
    },
  },
});

export const { setMessage, setSeverity } = alertSlice.actions;

export default alertSlice.reducer;
