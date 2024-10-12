import React from "react";
import useStyle from "./styles.js";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddPost } from "../../actions/ui.js";
import Form from "../Form/Form.js";
export default function InputPostModal({ updatePost }) {
  // Methods define
  const dispatch = useDispatch();
  // Global states
  const { isInputPostModalOpen, isEditingPost, edittingPostData } = useSelector(
    (state) => state.ui
  );
  const classes = useStyle({ isInputPostModalOpen });
  // Debug

  return (
    <div
      className={`${classes.InputPostModal} ${
        isInputPostModalOpen ? "active" : ""
      }`}
    >
      <Form
        isInputPostModalOpen={isInputPostModalOpen}
        isEditingPost={isEditingPost}
        edittingPostData={edittingPostData}
        updatePost={updatePost}
      />
      InputPostModal
      <button onClick={() => dispatch(toggleAddPost())}>Close</button>
    </div>
  );
}
