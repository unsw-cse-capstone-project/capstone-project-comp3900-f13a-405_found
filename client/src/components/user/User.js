import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import History from "./History"


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px', 
    paddingBottom: "80px",
    '& > *': {
      width: theme.spacing(100),
      height: theme.spacing(40),
      paddingTop: "10px",
      paddingBottom: "40px",
      paddingLeft: "20px",
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
    <div className={classes.root}>
      <Paper variant="outlined"> 
      <div className={classes.myText}>Recommended for you</div>
      </Paper>
      <Paper variant="outlined">
      <div className={classes.myText}>Your Episode History</div>
      <History/>
      </Paper>
    </div>
    
  );
};

export default User;
