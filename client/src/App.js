import { Container, AppBar, Typography, Grid } from "@mui/material";
import Posts from "./features/posts/Posts";
import Form from "./features/posts/Form";

function App() {
  return (
    <Container maxWidth="lg">
      <AppBar position="relative">
        <Typography component="h1" variant="h1">
          Memories
        </Typography>
      </AppBar>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <Posts />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Form />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
