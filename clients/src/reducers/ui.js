import {
  TOGGLE_INPUTPOSTMODAL,
  TOGGLE_SIDEBAR,
  TOGGLE_POSTDETAILMODAL,
  CLOSE_POSTDETAILMODAL,
  OPEN_POSTDETAILMODAL,
  OPEN_INPUTPOSTMODAL,
  SET_EDITING_POST_MODE,
} from "../constants/actionTypes";

const initialState = {
  isSidebarOpen: false,
  isInputPostModalOpen: false,
  isPostDetailModalOpen: false,
  isEditingPost: false,
  edittingPostData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    case TOGGLE_INPUTPOSTMODAL:
      return { ...state, isInputPostModalOpen: !state.isInputPostModalOpen };
    case OPEN_INPUTPOSTMODAL:
      return { ...state, isInputPostModalOpen: true };
    case TOGGLE_POSTDETAILMODAL:
      return { ...state, isPostDetailModalOpen: !state.isPostDetailModalOpen };
    case OPEN_POSTDETAILMODAL:
      return { ...state, isPostDetailModalOpen: true };
    case CLOSE_POSTDETAILMODAL:
      return { ...state, isPostDetailModalOpen: false };
    case SET_EDITING_POST_MODE:
      return {
        ...state,
        isEditingPost: action.payload.isEditingPost,
        edittingPostData: action.payload.postData || {},
      };
    default:
      return state;
  }
};
