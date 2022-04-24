import { Grid } from "@mui/material";
import React from "react";
import Post from "./Post";

export default function Posts() {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Post />
      </Grid>
      <Grid item xs={6}>
        <Post />
      </Grid>
      <Grid item xs={6}>
        <Post />
      </Grid>
      <Grid item xs={6}>
        <Post />
      </Grid>
    </Grid>
  );
}
