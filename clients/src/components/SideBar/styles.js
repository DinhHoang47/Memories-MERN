import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  sidebar: {
    [theme.breakpoints.up("sm")]: {
      display: "block",
      width: "64px",
    },
    [theme.breakpoints.up("md")]: {
      flexShrink: 0,
      width: "240px",
    },
    width: "0px",
    height: "100vh",
    overflow: "hidden",
    background: "tomato",
    position: "fixed",
    paddingTop: "64px",
    transition: "width 0.5s ease-in-out",
    top: 0,
    left: 0,
    zIndex: 20,
  },
}));
