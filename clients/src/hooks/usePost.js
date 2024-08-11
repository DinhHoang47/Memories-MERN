import { useEffect, useState } from "react";
import { fetchPosts } from "../api";

const usePost = (type, page = 1, query = "") => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchPosts(type, page, query);
        setPosts(response.data.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, [page, type, query]);
  return { posts, loading, error };
};

export default usePost;
