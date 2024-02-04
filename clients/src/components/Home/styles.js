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
  addNewPostButton:{
    background:"#565eec",
    width:"50px",
    height:"50px",
    borderRadius:"100%",
    position:"fixed",
    bottom:"64px",
    right:"64px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    boxShadow:"rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    cursor:"pointer",
    transformOrigin: "center",
    transition: "all .2s linear",
    "&:hover": {   // Fix the hover effect selector
      width: "56px",
      height: "56px",
      marginBottom:"-3px",
      marginRight:"-3px" // CSS trick to create animation when height, width change
    },
  },
  addNewPostButtonIcon:{
    color:"white",
    transform:"translate(-1px,-1px)"
  },
  addNewPostModal:{
    width:"320px",
    padding:"16px",
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%, -50%)",
    backgroundColor:"white"
  },
  modalCloseButton:{
    position:"absolute",
    top:0,
    right:0,
    transform:"translate(50%,-50%)",
    color:"#F50057",
    cursor:"pointer",
    background:"white",
    borderRadius:"100%",
    height:"24px"
  }
}));
