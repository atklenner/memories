import { Grid } from "@mui/material";
import React from "react";
import Post from "./Post";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, fetchPosts } from "./postsSlice";
import { useEffect } from "react";

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  return (
    <Grid container>
      {posts &&
        posts.map((post) => (
          <Grid item xs={6} key={post._id}>
            <Post {...post} />
          </Grid>
        ))}
    </Grid>
  );
}
