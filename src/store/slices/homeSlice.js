import { createSlice } from "@reduxjs/toolkit"

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        postList: []
    },
    reducers: {
        setPostList: (state, action) => {
            state.postList = action.payload
        },
        addPost: (state, action) => {
            state.postList.push(action.payload)
        },
        editPost: (state, action) => {
            state.postList = state.postList.map(post =>{
                if(post.id == action.payload.id){
                    return action.payload
                }
                return post;
            })
        },
    }
})

export const { setPostList, addPost, editPost } = homeSlice.actions

export default homeSlice.reducer