import React from "react";
import useStyle from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { togglePostDetail } from "../../actions/ui";

export default function PostDetailModal() {
  const { isPostDetailModalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const classes = useStyle({ isPostDetailModalOpen });

  return (
    <div
      className={`${classes.postDetailModal} ${
        isPostDetailModalOpen ? "active" : ""
      }`}
    >
      Post Detail Modal
      <button onClick={() => dispatch(togglePostDetail())}>Close</button>
    </div>
  );
}
