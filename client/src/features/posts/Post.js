import {
  Card,
  CardMedia,
  Button,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import React from "react";

export default function Post({ title, creator, message, tags }) {
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
        <Button size="small">Like</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
