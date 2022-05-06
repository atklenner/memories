import { Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Search() {
  const [search, setSearch] = useState({
    title: "",
    tags: "",
  });

  function clearSearch() {
    setSearch({
      title: "",
      tags: "",
    });
  }

  function handleSubmit(event) {
    return;
    // will probably have to think about this one for a bit...
  }

  function handleChange(event) {
    return;
  }

  return (
    <Paper component="form" elevation={4} onSubmit={handleSubmit}>
      <Typography>Search For a Post</Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        name="title"
        label="Title"
        type="text"
        id="title"
        value={search.title}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="tags"
        label="Tags (comma separated)"
        value={search.tags}
        onChange={(e) =>
          setSearch({ ...search, tags: e.target.value.split(",") })
        }
      />
      <Button variant="contained" fullWidth type="submit">
        Submit
      </Button>
      <Button variant="contained" color="error" fullWidth onClick={clearSearch}>
        Clear
      </Button>
    </Paper>
  );
}
