import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as Settings from "../../config/settings";

export const fetchPostList = createAsyncThunk(
  "home/fetchPostList",
  async () => {
    const res = await axios.get(
      Settings.POST_SERVER_URL + "?_start=0&_limit=20"
    );
    return res.data;
  }
);

export const searchPost = createAsyncThunk("home/searchPost", async (id) => {
  const res = await axios.get(Settings.POST_SERVER_URL + "/" + id);
  return res.data;
});

export const addPost = createAsyncThunk("home/addPost", async (postObj) => {
  const res = await axios.post(Settings.POST_SERVER_URL, postObj);
  return res.data;
});

export const editPost = createAsyncThunk("home/editPost", async (postObj) => {
  const res = await axios.put(
    Settings.POST_SERVER_URL + "/" + postObj.id,
    postObj
  );
  return res.data;
});

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    postList: [],
    status: Settings.API_IDLE,
    error: null,
  },
  reducers: {
    deletePost: (state, action) => {
      state.postList = state.postList.filter(
        (post) => post.id !== action.payload
      );
    },
  },
  extraReducers(builder) {
    builder
      // Status of fetch posts
      .addCase(fetchPostList.pending, (state, action) => {
        state.status = Settings.API_LOADING;
      })
      .addCase(fetchPostList.fulfilled, (state, action) => {
        state.status = Settings.API_SUCCESSED;
        state.postList = state.postList.concat(action.payload);
      })
      .addCase(fetchPostList.rejected, (state, action) => {
        state.status = Settings.API_FAILED;
        state.error = action.error.message;
      })

      // Status of search post
      .addCase(searchPost.pending, (state, action) => {
        state.status = Settings.API_LOADING;
      })
      .addCase(searchPost.fulfilled, (state, action) => {
        state.status = Settings.API_SUCCESSED;
        if (Array.isArray(action.payload)) {
          state.postList = state.postList.concat(action.payload);
        } else {
          state.postList = [action.payload];
        }
      })
      .addCase(searchPost.rejected, (state, action) => {
        state.status = Settings.API_FAILED;
        state.error = action.error.message;
      })

      // Status of add post
      .addCase(addPost.pending, (state, action) => {
        state.status = Settings.API_LOADING;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = Settings.API_ADD_POST_SUCCESSED;
        state.postList.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = Settings.API_FAILED;
        state.error = action.error.message;
      })

      // Status of edit post
      .addCase(editPost.pending, (state, action) => {
        state.status = Settings.API_LOADING;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.status = Settings.API_EDIT_POST_SUCCESSED;
        state.postList = state.postList.map((post) => {
          if (post.id === action.payload.id) {
            return {
              ...post,
              ...action.payload,
            };
          }
          return post;
        });
      })
      .addCase(editPost.rejected, (state, action) => {
        state.status = Settings.API_FAILED;
        state.error = action.error.message;
      });
  },
});

export const { deletePost } = homeSlice.actions;

export default homeSlice.reducer;
