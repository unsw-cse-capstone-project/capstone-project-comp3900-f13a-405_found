import {
  CssBaseline,
  makeStyles,
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
import { getSubscriptions } from "../../actions/subscriptions";
import Notifications from "../notifications/notifications";
import Player from "../player/player";
import Header from "./Search/Header";
import Playlist from "./Playlist/Playlist";
import Sidebar from "./Sidebar/Sidebar";
import Trending from "./Trending/Trending";
import UserPage from "./User/UserPage";

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
    height: "100%",
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
  return (
    <ThemeProvider theme={theme}>
      <Notifications />
      <Sidebar />
      <div className={classes.appMain}>
        <SwipeableBottomSheet
          overflowHeight={0}
          open={playerState.isVisible}
          overlay={false}
          style={{ left: "280px", zIndex: "1200" }}
        >
          <Player />
        </SwipeableBottomSheet>
        <Switch>
          <Route exact path={match.path} component={Header} />
          <Route exact path={`${match.path}/trending`} component={Trending} />
          <Route exact path={`${match.path}/playlist`} component={Playlist} />
          <Route exact path={`${match.path}/userpage`} component={UserPage} />
          <Route
            exact
            path={`${match.path}/share/:share_id`}
            component={Header}
          />
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
