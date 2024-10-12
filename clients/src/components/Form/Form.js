import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import useStyle from "./styles";
import FileBase from "react-file-base64";

import { useDispatch } from "react-redux";
import { createPost, editPost } from "../../actions/posts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleAddPost } from "@/actions/ui";

function Form({
  isEditingPost,
  edittingPostData,
  updatePost,
  isInputPostModalOpen,
}) {
  // Method,schema define
  const postDataSchema = {
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  };
  const classes = useStyle();
  const navigate = useNavigate();
  // Global state
  // Get current loggin user
  const loginUser = useSelector((state) => state.profile);
  const [postData, setPostData] = useState(postDataSchema);

  //  Local state
  const [errorMessage, setErrorMessage] = useState("");
  // create a key state for Filebase to force it re-render when reload component
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // Unique key for FileBase

  const dispatch = useDispatch();
  // Logic handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = loginUser.name;
    if (isEditingPost) {
      const result = await updatePost(postData);
      // Clear form and close modal
      if (result.success) {
        setPostData(postDataSchema);
        // clear the file input element
        setFileInputKey(Date.now());
        dispatch(toggleAddPost());
      } else {
        setErrorMessage(result.error);
      }
    } else {
      dispatch(createPost({ ...postData, name: userName }, navigate));
    }
    clear();
  };
  const clear = () => {
    setPostData(postDataSchema);
  };
  // Cycle logic handler
  useEffect(() => {
    if (isEditingPost) {
      setPostData(edittingPostData);
    } else {
      setPostData(postDataSchema);
    }
  }, [isEditingPost]);
  useEffect(() => {
    // Change the file Input Key to force re-render input component
    setFileInputKey(Date.now());
  }, [isInputPostModalOpen]);
  // Debug

  // Render component
  if (Object.keys(loginUser).length === 0) {
    return (
      <Paper elevation={6} className={classes.paper}>
        <Typography variant="h6">Login to create your own post</Typography>
      </Paper>
    );
  } else {
    return (
      <Paper elevation={6} className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.form} ${classes.root}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            {!isEditingPost ? "Create" : "Edit"} a Memory
          </Typography>
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
            value={postData.title}
          ></TextField>
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
            value={postData.message}
          ></TextField>
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
            value={postData.tags}
          ></TextField>
          <div className={classes.fileInput}>
            <FileBase
              key={fileInputKey} // Force re-render when key changes
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            ></FileBase>
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Post
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    );
  }
}

export default Form;
