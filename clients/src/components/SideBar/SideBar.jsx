import React from "react";
import useStyle from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closePostDetail } from "../../actions/ui";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Ensure closing post detail when click menu button
  const handleChangeTab = (targetTab) => {
    dispatch(closePostDetail());
    navigate(targetTab);
  };
  return (
    <div className={classes.sidebar}>
      <ul>
        {MenuItem.map((item) => {
          return (
            <li
              onClick={() => {
                handleChangeTab(item.to);
              }}
              key={item.id}
            >
              {item.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
