import React from "react";
import useStyle from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddPost } from "../../actions/ui";
import Form from "../Form/Form.js";
export default function AddPostModal() {
  const { isInputPostModalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const classes = useStyle({ isInputPostModalOpen });

  return (
    <div
      className={`${classes.addPostModal} ${
        isInputPostModalOpen ? "active" : ""
      }`}
    >
      <Form />
      AddPostModal
      <button onClick={() => dispatch(toggleAddPost())}>Close</button>
    </div>
  );
}
