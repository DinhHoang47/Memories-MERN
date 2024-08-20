import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  postDetailModal: (props) => ({
    position: "fixed",
    top: "64px",
    opacity: "0.5",
    transform: "scale(0)",
    zIndex: "10",
    backgroundColor: "MediumSeaGreen",
    width: "100%",
    height: "calc(100vh - 64px)",
    borderRadius: "2px",
    color: "white",
    background: "staleblue",
    transition: "0.7s cubic-bezier(0, 0.98, 0.47, 1)",
    "&.active": {
      left: 0,
      transform: "scale(1)",
      opacity: 1,
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
  postContainer: {
    maxWidth: "2080px",
    margin: "0 auto",
    background: "blue",
  },
  postDetail: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  postDetail_left: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
  },
  postDetail_right: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
    background: "white",
    color: "black",
  },
  postDetail_imageContainer: {
    padding: "16px",
    width: "100%",
  },
  postDetail_image: {
    width: "100%",
    borderRadius: "8px",
  },
  postDetail_comment: {
    padding: "16px",
  },
  commentItem: {
    width: "100%",
    display: "flex",
  },
  ommentItem_user: {
    background: "red",
  },
  commentItem_content: {
    flexGrow: 1,
  },
  commentItem_userImg: {
    width: "36px",
    height: "36px",
  },
  commentItem_content_textarea: {
    width: "100%",
    height: "64px",
  },
}));
