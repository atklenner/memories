import { Link } from "react-router-dom";
import { AppBar, Typography, Button } from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/system";

export default function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
  return (
    <AppBar position="relative">
      <Link to="/">
        <Typography component="h1" variant="h1">
          Memories
        </Typography>
      </Link>
      {user ? (
        <Box>
          <Typography>Signed in as: {user.email}</Typography>
          <Button variant="contained" color="secondary" onClick={logout}>
            Sign Out
          </Button>
        </Box>
      ) : (
        <Link to="/signin">
          <Button variant="contained" color="secondary">
            Sign In
          </Button>
        </Link>
      )}
    </AppBar>
  );
}
