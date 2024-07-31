import { useEffect, useState } from "react";
import { fetchPosts } from "../api";

const usePost = (type, page = 1, query = "") => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchPosts(type, page, query);
        console.log("response: ", response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, [page, type, query]);
};

export default usePost;
