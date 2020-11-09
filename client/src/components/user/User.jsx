import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import History from "./History";
import Recommendations from "./Recommendations";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
    paddingBottom: "80px",
    "& > *": {
      width: theme.spacing(100),
      height: theme.spacing(60),
      paddingTop: "10px",
      paddingBottom: "40px",
      paddingLeft: "15px",
    },
  },
  myText: {
    color: "black",
    fontSize: "1.6rem",
  },
}));

const User = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <Paper variant='outlined'>
          <div className={classes.myText}>Recommended for you</div>
          <Recommendations />
        </Paper>
        <Paper variant='outlined'>
          <div className={classes.myText}>Your Episode History</div>
          <History />
        </Paper>
      </div>
    </div>
  );
};

export default User;
