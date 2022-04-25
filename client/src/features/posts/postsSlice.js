import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    creator: "andrew",
    title: "First Post!",
    message: "Hello!",
    tags: ["tag1", "tag2"],
  },
  {
    creator: "andrew",
    title: "Second Post",
    message: "More text",
    tags: ["tag1", "tag2"],
  },
];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export default postsSlice.reducer;
