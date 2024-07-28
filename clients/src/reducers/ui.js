import { TOGGLE_ADDPOSTMODAL, TOGGLE_SIDEBAR } from "../constants/actionTypes";

const initialState = {
  isSidebarOpen: false,
  isAddPostModalOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    case TOGGLE_ADDPOSTMODAL:
      return { ...state, isAddPostModalOpen: !state.isAddPostModalOpen };
    default:
      return state;
  }
};
