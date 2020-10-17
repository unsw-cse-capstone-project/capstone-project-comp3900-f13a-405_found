import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core";
import LogoutButton from "../LogoutButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getShowsDetailsByListOfIds,
  getSubscribedShowsSubsCount,
} from "../../actions/subscriptions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

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
  const subscriptionState = useSelector((state) => state.subscriptions);

  const dispatch = useDispatch();
  const getSubCount = (id) => {
    const item = subscriptionState.subscribedShowSubCounts.filter(
      (i) => i.id === id
    );
    if (item.length <= 0) return 0;
    return item[0].count;
  };
  useEffect(() => {
    dispatch(
      getShowsDetailsByListOfIds(subscriptionState.subscriptions.join(","))
    );
    dispatch(
      getSubscribedShowsSubsCount(subscriptionState.subscriptions.join(","))
    );
  }, [subscriptionState.subscriptions]);

  const { classes } = props;
  return (
    <div className={classes.sidebar}>
      <div className={classes.wrapper}>
        <LogoutButton />
        <Link style={{ textDecoration: "none" }} to='/dashboard/trending'>
          <Button color='primary' size='large' variant='contained'>
            Trending Shows
          </Button>{" "}
        </Link>
        <Link style={{ textDecoration: "none" }} to='/dashboard'>
          <Button size='large' variant='contained'>
            Dashboard
          </Button>{" "}
        </Link>
        <div className={classes.myText}>Subscriptions</div>
        <ul className='list-group mb-4'>
          {!subscriptionState.isLoaded || !subscriptionState.showsLoaded ? (
            <CircularProgress size={200} thickness={6} color='secondary' />
          ) : subscriptionState.detailedSubscriptions.length > 0 ? (
            subscriptionState.detailedSubscriptions.map((subs) => (
              <li key={subs.id} className='list-group-item'>
                <div style={{ textAlign: "left", color: "black" }}>
                  {subs.name}{" "}
                </div>
                <div style={{ textAlign: "right", color: "black" }}>
                  {" "}
                  Subscriber count: {getSubCount(subs.id)}
                  <img height='60px' width='60px' src={subs.images[0].url} />
                </div>
              </li>
            ))
          ) : (
            <h1> No Subscriptions :( </h1>
          )}
        </ul>
      </div>
    </div>
  );
};

export default withStyles(style)(Sidebar);
