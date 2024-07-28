import { combineReducers } from "redux";
import posts from "./posts";
import profile from "./profile";
import ui from "./ui";
export default combineReducers({
  posts,
  profile,
  ui,
});
