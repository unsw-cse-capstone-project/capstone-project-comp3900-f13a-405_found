import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activateEmail } from "../../actions/authentication";
const ActivateEmail = ({ match }) => {
  const dispatch = useDispatch();
  const authenticationState = useSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(activateEmail(match.params.token));
  }, [dispatch, match.params.token]);

  return (
    authenticationState.isLoaded &&
    (authenticationState.emailVerified ? (
      <div>Email verified! Please login</div>
    ) : authenticationState.verifyError != null ? (
      <div>Something went wrong</div>
    ) : (
      <div>Loading...</div>
    ))
  );
};

export default ActivateEmail;
