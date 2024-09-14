import { useEffect, useState } from "react";
import { getPost } from "../api";
import { useDispatch } from "react-redux";
const usePostDetail = (postId, doFetch = true) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState(false);

  // Hàm update comment phục vụ cho việc thêm xóa sửa comment

  const updateComments = (newComments) => {
    setData((pre) => {
      return { ...pre, comments: newComments };
    });
  };

  // Dùng useEffect để kiểm tra sự thay đổi của postId, khi xảy ra thay đổi thì trigger action fetch data
  useEffect(() => {
    const getPostDetail = async () => {
      setLoading(true);
      setError(false);
      try {
        const { data: postData } = await getPost(postId);
        setData(postData);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    doFetch && getPostDetail();
  }, [postId]);
  return { isLoading, data, error, updateComments };
};

export default usePostDetail;
