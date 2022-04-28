import { Link } from "react-router-dom";
import { AppBar, Typography, Button } from "@mui/material";
import { useState } from "react";

export default function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <AppBar position="relative">
      <Link to="/">
        <Typography component="h1" variant="h1">
          Memories
        </Typography>
      </Link>
      {user ? (
        <Typography>Signed in as: {user.email}</Typography>
      ) : (
        <Link to="/signin">
          <Button variant="outlined" color="secondary">
            Sign In
          </Button>
        </Link>
      )}
    </AppBar>
  );
}
