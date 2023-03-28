import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        postList: []
    },
    reducers: {
        setPostList: (state, action) => {
            state.postList = action.payload
        }
    }
})

export const { setPostList } = homeSlice.actions

export default homeSlice.reducer