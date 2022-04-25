import { Grid } from "@mui/material";
import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";

export default function Posts() {
  const posts = useSelector((state) => state.posts);
  return (
    <Grid container>
      {posts.map((post) => (
        <Grid item xs={6}>
          <Post {...post} />
        </Grid>
      ))}
    </Grid>
  );
}
