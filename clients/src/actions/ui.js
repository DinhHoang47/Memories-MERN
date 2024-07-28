import { TOGGLE_ADDPOSTMODAL, TOGGLE_SIDEBAR } from "../constants/actionTypes";

export const toggleSidebar = () => (dispatch) => {
  dispatch({ type: TOGGLE_SIDEBAR });
};

export const toggleAddPost = () => (dispatch) => {
  dispatch({ type: TOGGLE_ADDPOSTMODAL });
};
