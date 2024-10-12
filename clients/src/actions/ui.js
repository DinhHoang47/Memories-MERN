import {
  CLOSE_POSTDETAILMODAL,
  SET_EDITING_POST_MODE,
  TOGGLE_INPUTPOSTMODAL,
  TOGGLE_POSTDETAILMODAL,
  TOGGLE_SIDEBAR,
} from "../constants/actionTypes";

export const toggleSidebar = () => (dispatch) => {
  dispatch({ type: TOGGLE_SIDEBAR });
};

export const toggleAddPost = () => (dispatch) => {
  dispatch({ type: TOGGLE_INPUTPOSTMODAL });
  dispatch({
    type: SET_EDITING_POST_MODE,
    payload: { isEditingPost: false },
  });
};

export const togglePostDetail = () => (dispatch) => {
  dispatch({ type: TOGGLE_POSTDETAILMODAL });
};

export const closePostDetail = () => (dispatch) => {
  dispatch({ type: CLOSE_POSTDETAILMODAL });
};

// Edit post modal
