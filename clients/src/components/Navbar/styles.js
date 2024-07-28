import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    display: "flex",
    flexDirection: "row",
    position: "sticky",
    zIndex: 30,
    top: 0,
    left: 0,
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 16px",
    height: "64px",
    backgroundColor: "white",
    borderBottom: "solid 1px #52586633",
    [theme.breakpoints.up("sm")]: {
      padding: "4px 50px",
    },
  },
  appBar__sidebar_toggle: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    display: "block",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  appBar_logo: {
    [theme.breakpoints.up("sm")]: {},
    color: "#565EEC",
    textDecoration: "none",
    fontSize: "2rem",
    fontWeight: 700,
    display: "none",
  },
  image: {
    marginLeft: "15px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    "& > *:not(:first-child)": {
      marginLeft: "12px",
    },
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));
