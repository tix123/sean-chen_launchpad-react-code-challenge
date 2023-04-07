import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as Settings from "../../config/settings";

export const fetchCountryList = createAsyncThunk(
  "universities/fetchCountryList",
  async () => {
    const res = await axios.get(
      Settings.COUNTRY_SERVER_URL + "/info?returns=none"
    );
    return res.data.data.sort(sortMethod);
  }
);

// sort method
const sortMethod = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
};

export const universitiesSlice = createSlice({
  name: "universities",
  initialState: {
    countryList: [],
    universityList: [],
    status: Settings.API_IDLE,
    error: null,
  },
  reducers: {
    setCountryList: (state, action) => {
      state.countryList = action.payload;
    },
    setUniversityList: (state, action) => {
      state.universityList = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // Status of fetch country list
      .addCase(fetchCountryList.pending, (state, action) => {
        state.status = Settings.API_LOADING;
      })
      .addCase(fetchCountryList.fulfilled, (state, action) => {
        state.status = Settings.API_SUCCESSED;
        state.countryList = action.payload;
      })
      .addCase(fetchCountryList.rejected, (state, action) => {
        state.status = Settings.API_FAILED;
        state.error = action.error.message;
      });
  },
});

export const { setUniversityList } = universitiesSlice.actions;

export default universitiesSlice.reducer;
