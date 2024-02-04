import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainContainer: {
    padding: "32px",
  },
  loadingContainer:{
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    minHeight:"calc(100vh - 64px)"
  },
  responsiveContainer:{
    display: "grid",
    gap: "32px",
    marginLeft:"auto",
    marginRight:"auto",
    gridTemplateColumns: "repeat(4,minmax(0,1fr))",
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: "1fr",
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: "1200px",
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: "1200px",
    },
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
  topBar:{
    display:"flex",
    justifyContent:"space-between",
    margin:"16px 0" 
  }
}));
