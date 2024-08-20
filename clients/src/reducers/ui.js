import {
  TOGGLE_ADDPOSTMODAL,
  TOGGLE_SIDEBAR,
  TOGGLE_POSTDETAILMODAL,
  CLOSE_POSTDETAILMODAL,
} from "../constants/actionTypes";

const initialState = {
  isSidebarOpen: false,
  isAddPostModalOpen: false,
  isPostDetailModalOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    case TOGGLE_ADDPOSTMODAL:
      return { ...state, isAddPostModalOpen: !state.isAddPostModalOpen };
    case TOGGLE_POSTDETAILMODAL:
      return { ...state, isPostDetailModalOpen: !state.isPostDetailModalOpen };
    case CLOSE_POSTDETAILMODAL:
      return { ...state, isPostDetailModalOpen: false };
    default:
      return state;
  }
};
