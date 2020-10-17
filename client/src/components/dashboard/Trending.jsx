import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTrendingShows,
  getShowsDetailsByListOfIds,
} from "../../actions/subscriptions";
import CircularProgress from "@material-ui/core/CircularProgress";

const Trending = () => {
  const subscriptionState = useSelector((state) => state.subscriptions);

  const dispatch = useDispatch();

  const getShowName = (showId) => {
    console.log(showId);
    const item = subscriptionState.detailedTrending.filter(
      (i) => i.id === showId
    );
    if (item.length <= 0) return 0;
    return item[0].name;
  };
  const getShowImage = (showId) => {
    console.log(showId);
    const item = subscriptionState.detailedTrending.filter(
      (i) => i.id === showId
    );
    if (item.length <= 0) return "";
    return item[0].images[0].url;
  };
  useEffect(() => {
    if (!subscriptionState.trendingShowsLoaded) {
      dispatch(getTrendingShows());
    }
    if (subscriptionState.trendingShowsLoaded) {
      dispatch(
        getShowsDetailsByListOfIds(
          subscriptionState.trendingShows.map((i) => i.showId).join(","),
          "Trending"
        )
      );
    }
  }, [subscriptionState.trendingShowsLoaded]);

  return (
    <>
      <h1>Top Shows!</h1>
      <ul className='list-group mb-4'>
        {!subscriptionState.isLoaded ||
        !subscriptionState.trendingShowsDetailsLoaded ? (
          <CircularProgress size={200} thickness={6} color='secondary' />
        ) : subscriptionState.trendingShows.length > 0 ? (
          subscriptionState.trendingShows.map((trending, index) => (
            <li key={trending.showId} className='list-group-item'>
              <div style={{ textAlign: "left", color: "black" }}>
                {`${index + 1}.  `}
                {getShowName(trending.showId)}
              </div>
              <div style={{ textAlign: "right", color: "black" }}>
                {" "}
                Subscriber count: {trending.count}
                <img
                  height='60px'
                  width='60px'
                  src={getShowImage(trending.showId)}
                />
              </div>
            </li>
          ))
        ) : (
          <h1> No Subscriptions :( </h1>
        )}
      </ul>
    </>
  );
};

export default Trending;
