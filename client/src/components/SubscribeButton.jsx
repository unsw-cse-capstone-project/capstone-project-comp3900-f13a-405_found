import React from "react";
import { subscribeToShow, unsubscribeFromShow } from "../actions/subscriptions";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";

const SubscribeButton = ({ id }) => {
  const dispatch = useDispatch();
  const subscriptionsState = useSelector((state) => state.subscriptions);

  const handleSubscribe = () => {
    dispatch(subscribeToShow(id));
  };

  const handleUnsubscribe = () => {
    dispatch(unsubscribeFromShow(id));
  };

  return subscriptionsState.isLoaded &&
    subscriptionsState.subscriptions.indexOf(id) !== -1 ? (
    <Button
      size='large'
      onClick={handleUnsubscribe}
      variant='contained'
      type='submit'
    >
      Unsubscribe
    </Button>
  ) : (
    <Button
      size='large'
      onClick={handleSubscribe}
      variant='contained'
      type='submit'
    >
      Subscribe
    </Button>
  );
};

export default SubscribeButton;
