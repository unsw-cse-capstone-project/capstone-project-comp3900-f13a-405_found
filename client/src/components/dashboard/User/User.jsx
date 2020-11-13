import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import History from "./History";
import Recommendations from "./Recommendations";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    padding: "10px",
    "& > *": {
      width: theme.spacing(100),
      paddingTop: "10px",
      paddingBottom: "40px",
      paddingLeft: "15px",
    },
  },
  myText: {
    color: "black",
    fontSize: "1.6rem",
  },
  reccPaper: {
    maxHeight: "380px",
  },
  histPaper: {
    height: "55vh",
    maxHeight: "350px",
  },
}));

const User = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <Paper variant="outlined" className={classes.reccPaper}>
          <div className={classes.myText}>Recommended for you</div>
          <Recommendations />
        </Paper>
        <Paper
          variant="outlined"
          className={classes.histPaper}
          // style={{
          //   zIndex: "-9999",
          // }}
        >
          <div className={classes.myText}>Your Episode History</div>
          <History style={{ height: "95%" }} />
        </Paper>
      </div>
    </div>
  );
};

export default User;
