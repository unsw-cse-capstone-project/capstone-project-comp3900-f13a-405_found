import React, { useEffect } from "react";
import Sidebar from "../dashboard/Sidebar";
import User from "./User";

import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { getSubscriptions } from "../../actions/subscriptions";
import { useDispatch } from "react-redux";

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
  center: {
    margin: "0 auto",
    position: "relative",
    left: "280px",
  },
});

const UserPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(getSubscriptions());
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <Sidebar />
      <div className={classes.center}>
        <User />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
};

export default UserPage;
