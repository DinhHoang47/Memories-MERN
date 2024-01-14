import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainContainer: {
    display: "grid",
    padding: "32px",
    alignItems: "center",
    gap: "32px",
    gridTemplateColumns: "repeat(4,minmax(0,1fr))",
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
}));
