import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  home: {
    "&.active": {
      "&::-webkit-scrollbar": {
        display: "none", // Hide scrollbar in WebKit-based browsers (Chrome, Safari)
      },
      "-ms-overflow-style": "none", // Hide scrollbar in Internet Explorer 10+
      "scrollbar-width": "none", // Hide scrollbar in Firefox
    },
  },
  posts: {
    background: "dodgerblue",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 290px))",
    gridGap: "1rem",
    padding: "1rem",
    justifyContent: "center",
    maxWidth: "2080px",
    position: "relative",
    "&.active": {
      height: "calc(100vh - 64px)",
      overflow: "hidden",
    },
  },
  post: {
    height: "200px",
    width: "290px",
    background: "orange",
  },
}));
