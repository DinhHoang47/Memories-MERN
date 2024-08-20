import React from "react";
import useStyle from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { togglePostDetail } from "../../actions/ui";
import postImg from "../../images/car.jpg";

export default function PostDetailModal() {
  const { isPostDetailModalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const classes = useStyle({ isPostDetailModalOpen });
  const handleClose = () => {
    window.history.pushState({}, "", `/posts`);
    return dispatch(togglePostDetail());
  };
  return (
    <div
      className={`${classes.postDetailModal} ${
        isPostDetailModalOpen ? "active" : ""
      }`}
    >
      <div className={classes.postContainer}>
        <div className={classes.postDetail}>
          <div className={classes.postDetail_left}>
            <div className={classes.postDetail_imageContainer}>
              <img className={classes.postDetail_image} src={postImg} alt="" />
            </div>
            <div className={classes.postDetail_info}></div>
          </div>
          <div className={classes.postDetail_right}>
            <div className={classes.postDetail_comment}>Comment</div>
          </div>
        </div>
        <div className={classes.relatived_post}>
          <p>Relatived posts</p>
        </div>
        <div className="">
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
