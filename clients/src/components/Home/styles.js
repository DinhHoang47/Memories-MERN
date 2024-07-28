import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  home: {},
  posts: {
    background: "dodgerblue",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 290px))",
    gridGap: "1rem",
    padding: "1rem",
    justifyContent: "center",
    maxWidth: "2080px",
    margin: "0 auto",
    position: "relative",
  },
  post: {
    height: "200px",
    width: "290px",
    background: "orange",
  },
}));
