import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  "@keyframes blowUpModal": {
    "0%": {
      transform: "scale(0)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
  postDetailModal: (props) => ({
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    top: "64px",
    [theme.breakpoints.up("sm")]: {
      left: "64px",
    },
    [theme.breakpoints.up("md")]: {
      left: "240px",
    },
    "&.active": {
      right: 0,
      pointerEvents: "visible",
    },
    "& .container": {
      margin: "auto",
      maxWidth: "2080px",
      position: "relative",
      overflow: "hidden",
      width: "100%",
      height: "100%",
    },
  }),
  postContainer: {
    background: "blue",
    position: "absolute",
    left: "100%",
    width: "100%",
    "&.active": {
      left: "0",
    },
  },
  postDetail: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("lg")]: {
      flexDirection: "row",
    },
  },
  postDetail_left: {
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      width: "50%",
    },
    "& .postDetail_info": {
      padding: "0 16px",
    },
  },
  postDetail_authorImg: {
    width: "40px",
  },
  postDetail_right: {
    width: "100%",
    [theme.breakpoints.up("lg")]: {
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
    "& .commentItem": {
      background: "orange",
      width: "100%",
      display: "flex",
      marginTop: "12px",
      "& .commentItem_user": {
        background: "red",
        "& .commentItem_userImg": {
          width: "40px",
          height: "40px",
        },
      },
      "& .commentItem_content": {
        width: "100%",
        flexGrow: 1,
        marginLeft: "8px",
        "& p": {
          fontWeight: "bold",
        },
      },
    },
    "& .comment_items": {
      overflowY: "auto",
      maxHeight: "600px",
    },
    "& .writeComment": {
      marginTop: "16px",
      "& input": {
        width: "100%",
      },
    },
  },
  relatived_post: {
    padding: "16px",
  },
  relativedPosts: {
    marginTop: "16px",
    "& .item": {
      marginRight: "16px",
    },
  },
}));
