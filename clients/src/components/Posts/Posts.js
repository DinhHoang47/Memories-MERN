import React from "react";
import Post from "../Posts/Post/Post";
import { Grid, CircularProgress } from "@mui/material";
import useStyle from "./styles";

import { useSelector } from "react-redux";
import { Paper, Typography } from "@material-ui/core";

function Posts({ setSelectedCardId }) {
  const classes = useStyle();
  const { posts, isLoading } = useSelector((state) => state.posts);
  return <div>Post</div>;
}

export default Posts;
