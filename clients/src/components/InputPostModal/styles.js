import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  InputPostModal: (props) => ({
    position: "fixed",
    top: "64px",
    left: "-100%",
    zIndex: "10",
    backgroundColor: "MediumSeaGreen",
    width: "100%",
    height: "calc(100vh - 64px)",
    borderRadius: "2px",
    color: "white",
    background: "staleblue",
    transition: "0.5s ease ",
    "&.active": {
      left: 0,
    },
    [theme.breakpoints.up("sm")]: {
      width: "calc(100% - 64px)",
      "&.active": {
        left: "64px",
      },
    },
    [theme.breakpoints.up("md")]: {
      width: "calc(100% - 240px)",
      "&.active": {
        left: "240px",
      },
    },
  }),
}));
