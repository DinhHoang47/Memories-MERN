import { getPostsBySearch } from "@/api";
import { useEffect, useState } from "react";

const useRelatedPosts = (postTags, postTitle, postId) => {
  const [relatedPosts, setRelatedPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getRelatedPosts = async () => {
    try {
      setError(false);
      setLoading(true);
      const res = await getPostsBySearch({
        searchValue: postTitle,
        tags: postTags,
      });
      if (res.status === 200) {
        setRelatedPost(res.data.data);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    getRelatedPosts();
  }, [postId, postTags, postId]);
  return { relatedPosts, loading, error };
};

export default useRelatedPosts;
