import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  withStyles,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import HomeIcon from "@material-ui/icons/Home";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../../actions/authentication";
import {
  getShowsDetailsByListOfIds,
  getSubscribedShowsNewEpisodes,
  getSubscribedShowsSubsCount,
} from "../../../actions/subscriptions";
import "./Sidebar.scss";

const style = {
  sidebar: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
    width: "280px",
    height: "100%",
    backgroundColor: "#292929",
    overflowY: "scroll",
  },
  sidebaritems: {
    color: "white",
  },
  myText: {
    color: "white",
    fontSize: "1.6rem",
  },
  wrapper: {
    paddingTop: "10px",
  },
  icons: {
    color: "white",
  },
  "&.MuiListItemText-root > span": {
    display: "inherit",
  },
  paddingItems: {
    paddingLeft: "15px",
    paddingRight: "15px",
  },
  showTitle: {
    paddingLeft: "18px",
    width: "180px",
  },
  backgroundComponent: {
    background: "rgba(0, 0, 0, 0.5)",
    border: "7px solid",
    borderColor: "rgba(0, 0, 0, 0.0)",
    borderRadius: "15px",
  },
};

const Sidebar = (props) => {
  const subscriptionState = useSelector((state) => state.subscriptions);
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleExpandClick = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.setItem("share_set", "false");
    dispatch(logout());
  };

  const getNewEpisodes = (id) => {
    const item = subscriptionState.subscribedEpisodes.filter(
      (i) => i.id === id
    );
    if (item.length > 0) {
      return item[0].episodes;
    } else {
      return [];
    }
  };
  useEffect(() => {
    dispatch(
      getShowsDetailsByListOfIds(subscriptionState.subscriptions.join(","))
    );
    dispatch(
      getSubscribedShowsSubsCount(subscriptionState.subscriptions.join(","))
    );
    dispatch(getSubscribedShowsNewEpisodes(subscriptionState.subscriptions));
  }, [subscriptionState.subscriptions, dispatch]);

  const { classes } = props;
  return (
    <div className={classes.sidebar}>
      <div className={classes.wrapper}>
        <List
          component="nav"
          className={classes.sidebaritems}
          aria-labelledby="nested-list-subheader"
        >
          <ListItem button onClick={handleLogout}>
            <ListItemIcon className={classes.icons}>
              <ExitToAppIcon className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
          <Divider style={{ backgroundColor: "white" }} />
          <ListItem
            button
            onClick={() => {
              history.push("/dashboard");
            }}
          >
            <ListItemIcon className={classes.icons}>
              <HomeIcon className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              history.push("/dashboard/userpage");
            }}
          >
            <ListItemIcon className={classes.icons}>
              <AccountCircleIcon className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary="User Page" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              history.push("/dashboard/playlist");
            }}
          >
            <ListItemIcon className={classes.icons}>
              <QueueMusicIcon className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary="Playlist" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              history.push("/dashboard/trending");
            }}
          >
            <ListItemIcon className={classes.icons}>
              <ShowChartIcon className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary="Trending Shows" />
          </ListItem>
          <ListItem button onClick={handleExpandClick}>
            <ListItemIcon className={classes.icons}>
              <InboxIcon className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary="Subscriptions" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {!subscriptionState.isLoaded ? (
              <CircularProgress size={200} thickness={6} color="secondary" />
            ) : subscriptionState.detailedSubscriptions.length > 0 ? (
              subscriptionState.detailedSubscriptions.map((subs) => (
                <List
                  key={subs.id}
                  component="div"
                  className={classes.paddingItems}
                >
                  <ListItemText className={classes.nested}>
                    <ListItemText
                      style={{ display: "flex" }}
                      component="span"
                      className={classes.backgroundComponent}
                    >
                      <ListItemIcon>
                        <img
                          height="60px"
                          width="60px"
                          src={subs.images[0].url}
                          alt="trending"
                          className="showImages"
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.showTitle}
                        primary={subs.name}
                      ></ListItemText>
                    </ListItemText>

                    <ListItemText
                      primary={
                        subscriptionState.subscribedEpisodesLoaded ? (
                          getNewEpisodes(subs.id).length > 0 ? (
                            <Accordion>
                              <AccordionSummary>
                                Latest Episodes
                              </AccordionSummary>
                              <Divider />

                              {getNewEpisodes(subs.id).map((episode, i) => {
                                return (
                                  <AccordionDetails key={i}>
                                    <div
                                      style={{
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                        display: "block",
                                      }}
                                    >
                                      {episode.name}
                                    </div>
                                  </AccordionDetails>
                                );
                              })}
                            </Accordion>
                          ) : null
                        ) : null
                      }
                    ></ListItemText>
                  </ListItemText>
                </List>
              ))
            ) : (
              <h1> No Subscriptions :( </h1>
            )}
          </Collapse>
        </List>
      </div>
    </div>
  );
};

export default withStyles(style)(Sidebar);
