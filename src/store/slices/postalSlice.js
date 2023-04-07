import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as Settings from "../../config/settings";

export const searchPostal = createAsyncThunk(
  "home/searchPostal",
  async (zip) => {
    const res = await axios.get(Settings.US_POSTAL_SERVER_URL + "/" + zip);
    return res.data;
  }
);

export const postalSlice = createSlice({
  name: "postal",
  initialState: {
    postalData: {},
    status: Settings.API_IDLE,
    error: null,
  },
  extraReducers(builder) {
    builder
      // Status of search postal
      .addCase(searchPostal.pending, (state, action) => {
        state.status = Settings.API_LOADING;
      })
      .addCase(searchPostal.fulfilled, (state, action) => {
        state.status = Settings.API_SUCCESSED;
        state.postalData = action.payload;
      })
      .addCase(searchPostal.rejected, (state, action) => {
        state.status = Settings.API_FAILED;
        state.error = action.error.message;
      });
  },
});

export default postalSlice.reducer;
