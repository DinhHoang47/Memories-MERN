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
    position: "absolute",
    top: "0",
    left: "100%",
    zIndex: "10",
    width: "100%",
    height: "calc(100vh - 64px)",
    borderRadius: "2px",
    color: "white",
    background: "staleblue",
    transition: "0.5s ease ",
    "&.active": {
      left: 0,
      right: 0,
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
