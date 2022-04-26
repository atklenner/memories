import { Grid } from "@mui/material";
import Posts from "../features/posts/Posts";
import Form from "../features/posts/Form";

export default function Home() {
  return (
    <Grid container>
      <Grid item xs={12} sm={7}>
        <Posts />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Form />
      </Grid>
    </Grid>
  );
}
