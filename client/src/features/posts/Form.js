import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, fillForm, selectAllPosts, updatePost } from "./postsSlice";

export default function Form() {
  const emptyPost = {
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  };
  const [postData, setPostData] = useState(emptyPost);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
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
      dispatch(updatePost({ ...postData, creator: user.username }));
    } else {
      dispatch(addNewPost({ ...postData, creator: user.username }));
    }
    clearPost();
  }

  function clearPost() {
    setPostData(emptyPost);
    dispatch(fillForm(0));
  }

  useEffect(() => {
    if (postID) setPostData(posts.filter((post) => post._id === postID)[0]);
  }, [postID, posts]);

  return (
    <Paper component="form" elevation={4} onSubmit={handleSubmit}>
      {!user ? (
        <Typography>Login to create a post</Typography>
      ) : (
        <div>
          <Typography>{postID ? "Editing" : "Create a New Memory"}</Typography>
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
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={clearPost}
          >
            Clear
          </Button>
        </div>
      )}
    </Paper>
  );
}
