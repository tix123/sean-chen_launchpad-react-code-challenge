import { createSlice } from "@reduxjs/toolkit"

export const postalSlice = createSlice({
    name: "postal",
    initialState: {
        postalData: {},
    },
    reducers: {
        setPostalData: (state, action) => {
            state.postalData = action.payload
        },
        
    }
})

export const { setPostalData } = postalSlice.actions

export default postalSlice.reducer