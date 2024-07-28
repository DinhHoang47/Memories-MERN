import React from "react";

import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { toggleAddPost } from "../../actions/ui";

export default function AddPostButton() {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(toggleAddPost())}
      className={classes.addButton}
    >
      +
    </button>
  );
}
