import React, { useEffect } from "react";
import { checkUserStillVerified } from "../../actions/authentication";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authenticationState = useSelector((state) => state.authentication);

  const { isAuthenticated, isLoaded } = authenticationState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserStillVerified());
  }, [dispatch]);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoaded ? (
          <CircularProgress
            size={200}
            thickness={6}
            style={{
              margin: "0 auto",
              position: "absolute",
              left: "50%",
              top: "50%",
            }}
          />
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
};

export default PrivateRoute;
