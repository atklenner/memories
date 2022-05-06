import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DATABASE_URL } from "../../constants/constants";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
  editingID: 0,
  currentPage: 1,
  numberOfPages: 1,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await fetch(DATABASE_URL + "/posts");
  return await res.json();
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    const res = await fetch(DATABASE_URL + "/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(initialPost),
    });
    return await res.json();
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (updatedPost) => {
    const res = await fetch(DATABASE_URL + "/posts/" + updatedPost._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(updatedPost),
    });
    return await res.json();
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postID) => {
    const res = await fetch(DATABASE_URL + "/posts/" + postID, {
      method: "DELETE",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    return await res.json();
  }
);

export const likePost = createAsyncThunk("posts/likePost", async (postID) => {
  const res = await fetch(DATABASE_URL + "/posts/" + postID + "/likePost", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  });
  return await res.json();
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded(state, action) {
      state.posts.push(action.payload);
    },
    fillForm(state, action) {
      state.editingID = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.concat(action.payload.data);
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) => {
          return post._id === action.payload._id ? action.payload : post;
        });
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.id
        );
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) => {
          return post._id === action.payload._id ? action.payload : post;
        });
      });
  },
});

export const { postAdded, fillForm } = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;

export const selectCurrentPost = (state) =>
  state.posts.posts.filter((post) => post._id === state.posts.editingID);
