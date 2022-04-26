import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import { AppBar, Typography, Container, Button } from "@mui/material";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <AppBar position="relative">
          <Link to="/">
            <Typography component="h1" variant="h1">
              Memories
            </Typography>
          </Link>
          <Link to="/signin">
            <Button>Sign In</Button>
          </Link>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
