import React from "react";
import { useLocation } from "react-router-dom";

import useStyle from "./styles";
import AddPostModal from "../AddPostModal/AddPostModal";
import usePost from "../../hooks/usePost";
import PostDetailModal from "../PostDetailModal/PostDetailModal";
import { useDispatch, useSelector } from "react-redux";
import { togglePostDetail } from "../../actions/ui";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home({ type }) {
  const classes = useStyle();
  const { isPostDetailModalOpen } = useSelector((state) => state.ui);
  const { posts, loading, error } = usePost(type, 2);
  return (
    <div className={`${classes.home} ${isPostDetailModalOpen ? "active" : ""}`}>
      <div
        className={`${classes.posts} ${isPostDetailModalOpen ? "active" : ""}`}
      >
        {posts.map((item, index) => (
          <Post key={`post-${index}`} data={item} classes={classes} />
        ))}
      </div>
      <AddPostModal />
      <PostDetailModal />
    </div>
  );
}

const Post = ({ classes, data, index }) => {
  const dispatch = useDispatch();
  const handleViewPostDetail = () => {
    window.history.pushState({}, "", `/posts/${data._id}`);
    dispatch(togglePostDetail());
  };
  return (
    <div className={classes.post}>
      <div onClick={handleViewPostDetail}>{data.title}</div>
      <p>{data.message}</p>
      <div className="">
        <p>Tags</p>
        <br />
        {data.tags.map((item) => (
          <span key={`tag-${item}`}>{item}</span>
        ))}
      </div>
    </div>
  );
};
