import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        postList: []
    },
    reducers: {
        setPostList: (state, action) => {
            state.postList = action.payload
        },
        addPostList: (state, action) => {
            state.postList.push(action.payload)
        }
    }
})

export const { setPostList, addPostList } = homeSlice.actions

export default homeSlice.reducer