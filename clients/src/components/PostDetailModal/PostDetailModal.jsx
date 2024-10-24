import React, { useEffect, useState } from "react";
import useStyle from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { togglePostDetail } from "../../actions/ui";
import imageHolder from "../../images/image-placeholder.jpg";
import userImg from "../../images/working.png";
import Slider from "react-slick";
import usePostDetail from "../../hooks/usePostDetail";
import { commentPost, deleteComment } from "../../actions/posts";
import { useUser } from "../../hooks/useUser";
import {
  CLOSE_POSTDETAILMODAL,
  OPEN_INPUTPOSTMODAL,
  SET_EDITING_POST_MODE,
} from "../../constants/actionTypes";
import useRelatedPosts from "@/hooks/useRelatedPosts";

export default function PostDetailModal() {
  // Method declare
  const dispatch = useDispatch();
  // Global state
  const { isPostDetailModalOpen } = useSelector((state) => state.ui);
  const { userProfile, isUserLoggedIn } = useUser();
  const userId = userProfile?._id;
  // Local state
  const [currentPostId, setCurrentPostId] = useState(null);
  const {
    data: postData,
    isLoading: isLoadingPostData,
    updateComments,
  } = usePostDetail(currentPostId, isPostDetailModalOpen);
  // Styles
  const classes = useStyle({ isPostDetailModalOpen });
  // Logic handler
  const handleClose = () => {
    window.history.pushState({}, "", `/posts`);
    dispatch(togglePostDetail());
  };
  // Lifecycle logics
  let postId = getPostId();
  // Debug
  return (
    <div
      className={`${classes.postDetailModal} ${
        isPostDetailModalOpen ? "active" : ""
      }`}
    >
      <div className="container">
        <div
          className={`${classes.postContainer} ${
            isPostDetailModalOpen ? "active" : ""
          }`}
        >
          <div className={classes.postDetail}>
            <div className={classes.postDetail_left}>
              <div className={classes.postDetail_imageContainer}>
                <img
                  className={classes.postDetail_image}
                  src={postData?.selectedFile || imageHolder}
                  alt=""
                />
              </div>
              <div className="postDetail_info">
                <h3>{postData?.title}</h3>
                <div className={classes.postDetail_authorInfo}>
                  <img
                    className={classes.postDetail_authorImg}
                    src={userImg}
                    alt=""
                  />
                  <p>{postData?.name}</p>
                </div>
                <p className="postDetail_description">{postData?.message}</p>
              </div>
            </div>
            <div className={classes.postDetail_right}>
              <div className={classes.postDetail_comment}>
                <h3>Comments</h3>
                <CommentItems
                  postId={currentPostId}
                  isUserLoggedIn={isUserLoggedIn}
                  userId={userId}
                  comments={postData?.comments}
                  updateComments={updateComments}
                />
                {isUserLoggedIn ? (
                  <WriteComment
                    dispatch={dispatch}
                    postId={currentPostId}
                    updateComments={updateComments}
                  />
                ) : (
                  <LoginToWriteComment />
                )}
              </div>
            </div>
          </div>
          <div className={classes.relatived_post}>
            <p>Relatived posts</p>
            {isPostDetailModalOpen && (
              <RelativedPosts
                setCurrentPostId={setCurrentPostId}
                postTitle={postData?.title}
                postTags={postData?.tags}
                postId={currentPostId}
                classes={classes}
              />
            )}
          </div>
          <EditPostButton postData={postData} />
          <div style={{ marginTop: "32px" }} className="">
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const EditPostButton = ({ postData }) => {
  const dispatch = useDispatch();
  // Logic handler
  const handleEditPost = () => {
    dispatch({ type: CLOSE_POSTDETAILMODAL });
    dispatch({ type: OPEN_INPUTPOSTMODAL });
    dispatch({
      type: SET_EDITING_POST_MODE,
      payload: { isEditingPost: true, postData },
    });
  };
  // Render component
  return (
    <div className="">
      <button onClick={handleEditPost}>Edit post</button>
    </div>
  );
};

const CommentItems = ({
  comments,
  userId,
  isUserLoggedIn,
  postId,
  updateComments,
}) => {
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await deleteComment(postId, commentId);
      if (response.status === 200) {
        const updatedComments = comments.filter(
          (comment) => comment._id !== commentId
        );
        updateComments(updatedComments);
      }
    } catch (error) {}
  };
  return (
    <div className="comment_items">
      {comments?.map((item) => (
        <CommentItem
          handleDeleteComment={handleDeleteComment}
          userId={userId}
          isUserLoggedIn={isUserLoggedIn}
          key={item._id}
          data={item}
        />
      ))}
    </div>
  );
};

const LoginToWriteComment = () => {
  return (
    <div className="">
      <a href="/auth">Login to write a comment</a>
    </div>
  );
};
const WriteComment = ({ dispatch, postId, updateComments }) => {
  const [comment, setComment] = useState("");
  const onSubmitComment = async () => {
    const result = await dispatch(commentPost(postId, comment, setComment));
    updateComments(result);
  };
  return (
    <div className="writeComment">
      <input
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        placeholder="Add a comment..."
        type="text"
      />
      <button
        onClick={() => {
          onSubmitComment();
        }}
      >
        Comment
      </button>
    </div>
  );
};

const CommentItem = ({ data, userId, isUserLoggedIn, handleDeleteComment }) => {
  const { author, content, _id: commentId } = data;
  // Check if current user is author of comment
  const isAuthor = userId === author._id;
  return (
    <div className={"commentItem"}>
      <div className={"commentItem_user"}>
        <img src={userImg} className={"commentItem_userImg"} />
      </div>
      <div className={"commentItem_content"}>
        <p>{author.name}</p>
        <span name="" id="">
          {content}
        </span>
        {isUserLoggedIn && isAuthor && (
          <button
            onClick={() => {
              handleDeleteComment(commentId);
            }}
            style={{ color: "red" }}
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};
const RelativedPosts = ({
  classes,
  postTags,
  postTitle,
  postId,
  setCurrentPostId,
}) => {
  //Local state
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState([]);
  const { relatedPosts, loading, error } = useRelatedPosts(
    postTags,
    postTitle,
    postId
  );
  // Handle logic

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToScroll: 5,
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Debug
  return (
    <div className={classes.relativedPosts}>
      <Slider {...settings}>
        {relatedPosts.map((item) => (
          <RelatedPost
            setCurrentPostId={setCurrentPostId}
            data={item}
            key={item._id}
          />
        ))}
      </Slider>
    </div>
  );
};

const RelatedPost = ({ data, setCurrentPostId }) => {
  const handleOpenPost = () => {
    window.history.replaceState(null, "", `/posts/${data._id}`);
    setCurrentPostId(data._id);
  };

  return (
    <>
      <style jsx={"true"}>{`
        .hover-underline {
          text-decoration: none;
          cursor: pointer;
          transition: text-decoration 0.2s;
        }
        .hover-underline:hover {
          text-decoration: underline;
        }
      `}</style>
      <div style={{ background: "chartreuse" }} className={"item"}>
        <p className="hover-underline" onClick={handleOpenPost}>
          {data?.title}
        </p>
        <button>Like</button>
      </div>
    </>
  );
};

// Internal Handler

const getPostId = () => {
  const url = window.location.pathname;
  const postId = url.split("/posts/")[1];
  return postId;
};
