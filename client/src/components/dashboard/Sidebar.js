import React from "react";
import { makeStyles, withStyles } from "@material-ui/core";
import LogoutButton from "../LogoutButton";
const style = {
  sidebar: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
    width: "280px",
    height: "100%",
    backgroundColor: "#253055",
  },
  myText: {
    color: "white",
    fontSize: "1.6rem",
  },
  wrapper: {
    margin: "0 auto",
    paddingTop: "10px",
  },
};

const Sidebar = (props) => {
  const { classes } = props;
  return (
    <div className={classes.sidebar}>
      <div className={classes.wrapper}>
        <LogoutButton />

        <div className={classes.myText}>Subscriptions</div>
      </div>
    </div>
  );
};

export default withStyles(style)(Sidebar);
