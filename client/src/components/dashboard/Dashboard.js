import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Trending from "./Trending";
import Playlist from "./Playlist";
import Notifications from "../notifications/notifications";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
import Button from "@material-ui/core/Button";
import { displayAlert } from "../../actions/alert";
import {
  makeStyles,
  CssBaseline,
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import Header from "./Header";
import Player from "../player/player";
import { getSubscriptions } from "../../actions/subscriptions";
import { useDispatch, useSelector } from "react-redux";
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
  const playerState = useSelector((state) => state.player);

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
      <Notifications />
      <Sidebar />
      <div className={classes.appMain}>
        <SwipeableBottomSheet
          overflowHeight={0}
          open={playerState.isVisible}
          overlay={false}
          style={{ left: "280px" }}
        >
          <Player />
        </SwipeableBottomSheet>
        <Switch>
          <Route exact path={match.path} component={Header} />
          <Route exact path={`${match.path}/trending`} component={Trending} />
          <Route exact path={`${match.path}/playlist`} component={Playlist} />
          <Route exact path={`${match.path}/:share_id`} component={Header} />

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
