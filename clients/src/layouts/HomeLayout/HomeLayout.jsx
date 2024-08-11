import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/Navbar/NavBar";
import { SideBar } from "../../components/SideBar/SideBar";
import useStyle from "./styles";
import { SideBarMobile } from "../../components/SideBarMobile/SideBarMobile";
import AddPostButton from "../../components/AddPostButton/AddPostButton";

export const HomeLayout = (props) => {
  const classes = useStyle();
  return (
    <div className={classes.homelayout}>
      <SideBarMobile />
      <NavBar />
      <div className={classes.homelayout_body}>
        <SideBar />
        <div className={classes.homelayout_main}>
          <Outlet />
        </div>
        <AddPostButton />
      </div>
    </div>
  );
};
