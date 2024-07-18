import React from "react";
import { Outlet, Link } from "react-router-dom";
import NavBar from "../../components/Navbar/NavBar";

export const HomeLayout = (props) => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};
