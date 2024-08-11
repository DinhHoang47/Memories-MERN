import React, { useEffect, useState } from "react";
import AddPostModal from "../AddPostModal/AddPostModal";
import { useNavigate, useParams } from "react-router-dom";
import makeStyles from "./style";
import { getPost } from "../../api";

export default function PostDetails() {
  const navigate = useNavigate();
  const classes = makeStyles();
  const { id: postId } = useParams();
  const [postData, setPostData] = useState();
  useEffect(() => {
    const getPostsDetail = async () => {
      const result = await getPost(postId);
      console.log("result: ", result);
    };
    getPostsDetail();
  }, [postId]);
  return (
    <div className={classes.post_detail}>
      <button onClick={() => navigate(-1)}>back</button>
      <AddPostModal />
    </div>
  );
}
