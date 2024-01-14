import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  [theme.breakpoints.down("sm")]: {
    mainContainer: {
      "&&": {
        flexDirection: "column-reverse",
      },
    },
  },
  mainContainer: {
    flexGrow: 1,
  },
  appBarSearch: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 4,
    marginBottom: "1rem",
    display: "flex",
    padding: "16px",
    marginTop: "32px",
  },
  pagination: {
    borderRadius: 4,
    marginTop: "1rem",
    padding: "16px",
  },
  gridContainer: {
    position: "relative",
    paddingLeft: "279px",
  },
  leftSideBar: {
    position: "fixed",
    top: "64px",
    left: 0,
    backgroundColor: "white",
    height: "calc(100vh - 64px)",
    width: "279px",
    borderRight: "solid 1px #52586633",
  },
  mainContent: {
    flexGrow: 1,
    "!important": true,
  },
  test: {
    backgroundColor: "red",
    width: "full",
    height: "100px",
  },
}));
