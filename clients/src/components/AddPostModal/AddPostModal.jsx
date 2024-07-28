import React, { useState } from "react";
import useStyle from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddPost } from "../../actions/ui";

export default function AddPostModal() {
  const { isAddPostModalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  console.log("isAddPostModalOpen: ", isAddPostModalOpen);
  const classes = useStyle({ isAddPostModalOpen });

  return (
    <div
      className={`${classes.addPostModal} ${
        isAddPostModalOpen ? "active" : ""
      }`}
    >
      AddPostModal
      <button onClick={() => dispatch(toggleAddPost())}>Close</button>
    </div>
  );
}
