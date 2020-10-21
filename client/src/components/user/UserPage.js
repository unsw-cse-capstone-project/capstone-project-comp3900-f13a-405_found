import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Trending from "./Trending";
import User from "./User"

import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import Header from "./Header";
import { getSubscriptions } from "../../actions/subscriptions";
import { useDispatch } from "react-redux";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "160px",
    width: "100%",
    paddingTop: "10px",
  },
});

const Dashboard = () => {
  let match = useRouteMatch();
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(getSubscriptions());
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <Sidebar />
      <div className={classes.appMain}>
        <User></User>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
};

export default Dashboard;
