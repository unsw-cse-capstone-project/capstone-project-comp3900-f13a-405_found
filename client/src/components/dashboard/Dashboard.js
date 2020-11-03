import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Trending from "./Trending";
import Notifications from "../notifications/notifications";
import { displayAlert } from "../../actions/alert";
import {
  makeStyles,
  CssBaseline,
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import Header from "./Header";
import Player from "../player/player"
import { getSubscriptions } from "../../actions/subscriptions";
import { useDispatch } from "react-redux";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import axios from "axios";
import { SET_EPISODE, SET_STATE_FROM_EPISODES } from "../../actions/types";


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
  useEffect( async () => {
    console.log("Dashboard - Grabbing podcast details user-history");
    try {
      const config = {
        withCredentials: true,
      };

      const res = await axios.get(`/api/latest-episode`, config);
      
      // console.log("TESTING EPISODE: " + res.data.episode_id);
      // console.log("TESTING SECONDS: " + res.data.seconds);
      // console.log("TESTING URL: " + res.data.url);
      // console.log("TESTING IMAGE: " + res.data.image);

      dispatch({
        type: SET_STATE_FROM_EPISODES,
        payload: {
          episode_id: res.data.episode_id,
          url: res.data.url,
          image: res.data.image,
        }
      });
    } catch (err) {
      displayAlert("An error occurred handlePlay()");
    }
  }, []);
  return (
      <ThemeProvider theme={theme}>
      <Player />
      <Notifications/>
      <Sidebar />
      <div className={classes.appMain}>
        <Switch>
          <Route exact path={match.path} component={Header} />
          <Route exact path={`${match.path}/trending`} component={Trending} />
          {/* this is just to redirect to 404 */}
          <Route
            render={({ location }) => (
              <Redirect
                to={{
                  pathname: "/404",
                  state: { originalUrl: location.pathname },
                }}
              />
            )}
          />
        </Switch>
      </div>
      <CssBaseline />
    </ThemeProvider>
    
  );
};

export default Dashboard;
