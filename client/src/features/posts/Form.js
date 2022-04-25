import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postAdded } from "./postsSlice";

export default function Form() {
  const emptyPost = {
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  };
  const [postData, setPostData] = useState(emptyPost);
  const dispatch = useDispatch();

  function handleChange(e) {
    setPostData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postAdded(postData));
    clearPost();
  }

  function clearPost() {
    setPostData(emptyPost);
  }

  return (
    <Paper component="form" elevation={4} onSubmit={handleSubmit}>
      <Typography>Create a New Memory</Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="creator"
        label="Creator"
        name="creator"
        type="text"
        value={postData.creator}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="title"
        label="Title"
        type="text"
        id="title"
        value={postData.title}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="message"
        label="Message"
        type="text"
        id="message"
        multiline
        rows={4}
        value={postData.message}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="tags"
        label="Tags (comma separated)"
        value={postData.tags}
        onChange={(e) =>
          setPostData({ ...postData, tags: e.target.value.split(",") })
        }
      />
      <Button variant="contained" fullWidth type="submit">
        Submit
      </Button>
      <Button variant="contained" color="error" fullWidth onClick={clearPost}>
        Clear
      </Button>
    </Paper>
  );
}
