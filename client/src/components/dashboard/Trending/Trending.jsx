import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTrendingShows,
  getShowsDetailsByListOfIds,
} from "../../../actions/subscriptions";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Trending.scss";
import Grid from "@material-ui/core/Grid";
import PersonIcon from "@material-ui/icons/Person";

const Trending = () => {
  const subscriptionState = useSelector((state) => state.subscriptions);

  const dispatch = useDispatch();

  const getShowName = (showId) => {
    const item = subscriptionState.detailedTrending.filter(
      (i) => i.id === showId
    );
    if (item.length <= 0) return 0;
    return item[0].name;
  };
  const getShowImage = (showId) => {
    const item = subscriptionState.detailedTrending.filter(
      (i) => i.id === showId
    );
    if (item.length <= 0) return "";
    return item[0].images[0].url;
  };
  useEffect(() => {
    dispatch(
      getShowsDetailsByListOfIds(
        subscriptionState.trendingShows.map((i) => i.showId).join(","),
        "Trending"
      )
    );
  }, [dispatch, subscriptionState.trendingShows]);

  useEffect(() => {
    dispatch(getTrendingShows());
  }, [dispatch]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <div>
          <h1>Top Shows!</h1>
        </div>
      </Grid>
      <Grid style={{ height: "80vh", overflowY: "scroll" }} item xs={12}>
        <ul className='list-group mb-4'>
          {!subscriptionState.isLoaded ||
          !subscriptionState.trendingShowsDetailsLoaded ? (
            <CircularProgress size={200} thickness={6} color='secondary' />
          ) : subscriptionState.trendingShows.length > 0 ? (
            subscriptionState.trendingShows.map((trending, index) => (
              <li key={trending.showId} className='list-group-item'>
                <div style={{ textAlign: "left", color: "black" }}>
                  <div>
                    {" "}
                    {`${index + 1}.  `}
                    {getShowName(trending.showId)}
                  </div>
                  <div>
                    {" "}
                    <PersonIcon /> {trending.count}
                  </div>
                </div>
                <div style={{ textAlign: "right", color: "black" }}>
                  <img
                    height='60px'
                    width='60px'
                    src={getShowImage(trending.showId)}
                    alt='trending'
                  />
                </div>
              </li>
            ))
          ) : (
            <h1> No Subscriptions :( </h1>
          )}
        </ul>
      </Grid>
    </Grid>
  );
};

export default Trending;
