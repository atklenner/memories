import {
  Card,
  CardMedia,
  Button,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { deletePost, likePost, fillForm } from "./postsSlice";

export default function Post({
  title,
  creator,
  message,
  tags,
  _id,
  likeCount,
}) {
  const dispatch = useDispatch();
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {creator}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tags}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => dispatch(likePost(_id))}>
          {likeCount} {likeCount === 1 ? "Like" : "Likes"}
        </Button>
        <Button size="small" onClick={() => dispatch(deletePost(_id))}>
          Delete
        </Button>
        <Button size="small" onClick={() => dispatch(fillForm(_id))}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
