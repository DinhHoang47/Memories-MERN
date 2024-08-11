import React from "react";
import { Avatar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import useStyle from "./styles";
import memoriesImg from "../../images/picture.png";
import { LOGOUT } from "../../constants/actionTypes";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { toggleSidebar } from "../../actions/ui";

export default function NavBar() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const user = useSelector((state) => state.profile);

  const logout = (e) => {
    e.preventDefault();
    dispatch({ type: LOGOUT });
    messageApi.success("Logged out.");
  };
  return (
    <>
      {contextHolder}
      <div className={classes.appBar}>
        <div className={classes.brandContainer}>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className={classes.appBar__sidebar_toggle}
          >
            <MenuRoundedIcon />
          </button>
          <Typography
            to="/"
            component={Link}
            className={classes.appBar_logo}
            variant="p"
            align="center"
          >
            Memories
          </Typography>
          <img
            className={classes.image}
            src={memoriesImg}
            alt="memories"
            height="40"
          />
        </div>
        <Toolbar>
          {Object.keys(user).length !== 0 ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user?.name}
                src={user?.picture}
              >
                {user?.name?.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user?.name}
              </Typography>
              <Button
                onClick={(e) => logout(e)}
                variant="contained"
                className={classes.logout}
                color="secondary"
              >
                <ExitToAppIcon />
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </div>
    </>
  );
}
