import React, { useEffect } from "react";
import User from "./User";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
import { useDispatch, useSelector } from "react-redux";

import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { getSubscriptions } from "../../../actions/subscriptions";

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
  center: {
    margin: "0 auto",
    position: "relative",
  },
});

const UserPage = () => {
  const dispatch = useDispatch();
  const playerState = useSelector((state) => state.player);
  const classes = useStyles();
  useEffect(() => {
    dispatch(getSubscriptions());
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.center}>
        <User style={{ zIndex: "-9999" }} />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
};

export default UserPage;
