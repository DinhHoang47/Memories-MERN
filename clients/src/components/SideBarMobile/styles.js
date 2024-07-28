import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  sidebar: {},
  sidebar_main: (props) => ({
    position: "fixed",
    top: 0,
    left: "-240px",
    zIndex: 50,
    width: "240px",
    minHeight: "100vh",
    background: "blue",
    transition: "0.5s",
    "&.active": {
      left: 0,
    },
  }),
  sidebar_overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    transition: "0.5s",
    opacity: 0,
    visibility: "hidden",
    zIndex: 40,
    "&.active": {
      opacity: 1,
      visibility: "visible",
    },
  },
}));
