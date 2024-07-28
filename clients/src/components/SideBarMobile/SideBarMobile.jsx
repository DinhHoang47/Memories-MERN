import React, { useState } from "react";
import useStyle from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../actions/ui";

export const SideBarMobile = () => {
  const { isSidebarOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const classes = useStyle({ isSidebarOpen });
  return (
    <div className={classes.sidebar}>
      <div
        className={`${classes.sidebar_main} ${isSidebarOpen ? "active" : ""}`}
      >
        <p>Mobile side bar</p>
        <button onClick={() => dispatch(toggleSidebar())}>Close</button>
      </div>
      <div
        onClick={() => dispatch(toggleSidebar())}
        className={`${classes.sidebar_overlay} ${
          isSidebarOpen ? "active" : ""
        }`}
      ></div>
    </div>
  );
};
