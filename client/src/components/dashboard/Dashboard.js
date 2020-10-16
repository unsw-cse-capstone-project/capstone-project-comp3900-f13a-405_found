import React from "react";
import Sidebar from "./Sidebar";
import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import Header from "./Header";
import Player from "../player/player"

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
  const classes = useStyles();

  return (

      <ThemeProvider theme={theme}>
      <Player/>
      <Sidebar />
      <div className={classes.appMain}>
        <Header />
      </div>
      <CssBaseline />
    </ThemeProvider>
    
  );
};

export default Dashboard;
