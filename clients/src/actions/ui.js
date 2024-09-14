import {
  CLOSE_POSTDETAILMODAL,
  TOGGLE_ADDPOSTMODAL,
  TOGGLE_POSTDETAILMODAL,
  TOGGLE_SIDEBAR,
} from "../constants/actionTypes";

export const toggleSidebar = () => (dispatch) => {
  dispatch({ type: TOGGLE_SIDEBAR });
};

export const toggleAddPost = () => (dispatch) => {
  dispatch({ type: TOGGLE_ADDPOSTMODAL });
};

export const togglePostDetail = () => (dispatch) => {
  dispatch({ type: TOGGLE_POSTDETAILMODAL });
};

export const closePostDetail = () => (dispatch) => {
  dispatch({ type: CLOSE_POSTDETAILMODAL });
};

// Edit post modal
