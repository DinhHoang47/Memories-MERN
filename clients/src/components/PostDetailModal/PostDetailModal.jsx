import React from "react";
import useStyle from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { togglePostDetail } from "../../actions/ui";
import postImg from "../../images/car.jpg";
import userImg from "../../images/working.png";

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
            <div className={classes.postDetail_comment}>
              <h3>Comments</h3>
              <CommentSection classes={classes} />
            </div>
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

const CommentSection = ({ classes }) => {
  return (
    <div className={classes.commentSection}>
      <CommentItem classes={classes} />
      <CommentItem classes={classes} />
      <CommentItem classes={classes} />
    </div>
  );
};

const CommentItem = ({ classes }) => {
  return (
    <div className={classes.commentItem}>
      <div className={classes.commentItem_user}>
        <img src={userImg} className={classes.commentItem_userImg} />
      </div>
      <div className={classes.commentItem_content}>
        <div className={classes.commentItem_userName}>
          <p>user name</p>
          <textarea
            className={classes.commentItem_content_textarea}
            name=""
            id=""
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </textarea>
        </div>
      </div>
    </div>
  );
};
