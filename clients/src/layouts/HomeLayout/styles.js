import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  homelayout: {
    position: "relative",
  },
  homelayout_body: {
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "64px",
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: "240px",
    },
    paddingLeft: "0px",
    display: "flex",
    position: "relative",
    transition: "padding 0.5s ease-in-out",
    minHeight: "calc(100vh - 64px)",
  },
  homelayout_main: {
    background: "green",
    width: "100%",
  },
}));
