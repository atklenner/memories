import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, fillForm, selectAllPosts, updatePost } from "./postsSlice";

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
  const posts = useSelector(selectAllPosts);
  const postID = useSelector((state) => state.posts.editingID);

  function handleChange(e) {
    setPostData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (postID) {
      dispatch(updatePost(postData));
    } else {
      dispatch(addNewPost(postData));
    }
    clearPost();
  }

  function clearPost() {
    setPostData(emptyPost);
    dispatch(fillForm(0));
  }

  useEffect(() => {
    // if (postID) console.log(posts.filter((post) => post._id === postID));
    if (postID) setPostData(posts.filter((post) => post._id === postID)[0]);
  }, [postID, posts]);

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
