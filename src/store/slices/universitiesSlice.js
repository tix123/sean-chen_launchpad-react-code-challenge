import { createSlice } from "@reduxjs/toolkit"

export const universitiesSlice = createSlice({
    name: "universities",
    initialState: {
        countryList: [],
        universityList: [],
    },
    reducers: {
        setCountryList: (state, action) => {
            state.countryList = action.payload
        },
        setUniversityList: (state, action) => {
            state.universityList = action.payload
        },
    }
})

export const { setCountryList, setUniversityList } = universitiesSlice.actions

export default universitiesSlice.reducer