import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./slices/homeSlice";
import alertReducer from "./slices/alertSlice";
import universitiesReducer from "./slices/universitiesSlice";
import postalReducer from "./slices/postalSlice";

export default configureStore({
  reducer: {
    home: homeReducer,
    alert: alertReducer,
    universities: universitiesReducer,
    postal: postalReducer,
  },
});
