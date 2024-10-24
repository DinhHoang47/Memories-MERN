import axios from "axios";
import { user } from "../services/localServices";
import jwt_decode from "jwt-decode";
import {
  HOME_POST,
  LIKED_POST,
  LOGOUT,
  MY_POST,
} from "../constants/actionTypes";

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_BASE_URL });

let store;
export const injectStore = (_store) => {
  store = _store;
};

API.interceptors.request.use((req) => {
  const loginUser = JSON.parse(user.get());

  if (loginUser) {
    const expiredIn = jwt_decode(loginUser.token).exp * 1000;
    if (expiredIn < Date.now()) {
      store.dispatch({ type: LOGOUT });
      window.alert("Token expired. Please loggin again.");
    } else {
      req.headers.Authorization = `Bearer ${loginUser.token}`;
    }
  }
  return req;
});

// const url = "https://my-memories-api.onrender.com/posts";

// Posts API

export const fetchPosts = async (type, page = 1, query = "") => {
  let url;
  switch (type) {
    case HOME_POST:
      url = `/posts`;
      break;
    case MY_POST:
      url = `/myposts`;
      break;
    case LIKED_POST:
      url = `/likedposts`;
      break;
    case "search":
      url = `/posts/search`;
      break;
    default:
      throw new Error(`Invalid post type: ${type}`);
  }
  const response = await API.get(url);
  return response;
};

export const getPostsBySearch = (queryParams) => {
  return API.get(
    `/posts/search?searchQuery=${queryParams.searchValue || "none"}&tags=${
      queryParams.tags
    }`
  );
};

export const createPost = (newPost) => API.post("/posts", newPost);

export const editPost = (id, updatedPost) => {
  return API.patch(`/posts/${id}`, updatedPost);
};

export const deletePost = (id) => {
  return API.delete(`/posts/${id}`);
};

export const likePost = (id) => {
  return API.patch(`/posts/${id}/likePost`);
};

export const commentPost = (id, comment) => {
  return API.patch(`/posts/${id}/commentPost`, { comment });
};

export const deleteComment = (postId, commentId) => {
  return API.patch(`/posts/${postId}/deleteComment`, { commentId });
};

// Post API

export const getPost = (id, signal) => {
  return API.get(`/posts/${id}`, { signal });
};

// User APIS

// Sign-up API

export const signUp = (userData) => API.post(`user/signup`, userData);

// Sign-in API

export const signIn = (userData) => API.post(`user/signin`, userData);

// Sign-in with Google API

export const googleSignIn = (credential) =>
  API.post(`user/google-signin`, credential);
