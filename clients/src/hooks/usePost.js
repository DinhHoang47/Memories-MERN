import { useEffect, useState } from "react";
import { fetchPosts as getPosts, editPost } from "@/api";

const usePost = (type, page = 1, query = "") => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPosts(type, page, query);
      setPosts(response.data.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  // Edit post
  const updatePost = async (updatedPost) => {
    try {
      const { data: returnedPost } = await editPost(
        updatedPost._id,
        updatedPost
      );
      //   update clients side posts
      setPosts((pre) => {
        return pre.map((item) =>
          item._id === returnedPost._id ? returnedPost : item
        );
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: "Error when updating post!" };
    }
  };
  // Cycle logic
  useEffect(() => {
    fetchPosts();
  }, [page, type, query]);
  return { posts, loading, error, updatePost };
};

export default usePost;
