import React from "react";
import useStyle from "./styles";
import { Link } from "react-router-dom";
const MenuItem = [
  {
    id: "posts",
    to: "/posts",
    title: "Home",
  },
  {
    id: "liked",
    to: "/posts/liked",
    title: "Liked",
  },
  {
    id: "mymemories",
    to: "/posts/myposts",
    title: "My Memories",
  },
];
export const SideBar = () => {
  const classes = useStyle();
  return (
    <div className={classes.sidebar}>
      <ul>
        {MenuItem.map((item) => {
          return (
            <li key={item.id}>
              <Link to={item.to}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
