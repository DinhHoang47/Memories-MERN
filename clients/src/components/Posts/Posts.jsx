import React from "react";
import Post from "./Post/Post";
import { Grid, CircularProgress } from "@mui/material";
import useStyle from "./styles";

import { useSelector } from "react-redux";
import { Paper, Typography } from "@material-ui/core";

function Posts({ setSelectedCardId,setOpenAddNewPost }) {
  const classes = useStyle();
  const { posts, isLoading } = useSelector((state) => state.posts);
  if (!isLoading && posts.length === 0) {
    return (
      <Paper elevation={1}>
        <Typography variant="h6" style={{ textAlign: "center" }}>
          Posts not found !
        </Typography>
      </Paper>
    );
  }
  return isLoading ? (
    <div className={classes.loadingContainer}>
      <CircularProgress />
    </div>
  ) : (
    <div
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      <div className={classes.responsiveContainer}>
        {posts?.map((post, index) => (
          <Post
          setOpenAddNewPost={setOpenAddNewPost}
            key={index + 1}
            setSelectedCardId={setSelectedCardId}
            post={post}
          />
        ))}
      </div>
    </div>
  );
}

export default Posts;
