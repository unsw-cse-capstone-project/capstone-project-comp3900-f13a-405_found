import React, { useEffect, useState } from "react";
import { signup } from "../../actions/authentication";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import signupForm from "./Signupform"

const Signup = () => {
  
  const authenticationState = useSelector((state) => state.authentication);

  // redirect to dashboard if the user is authenticated
  if (authenticationState.isLoaded && authenticationState.isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    signupForm()
  );
};

export default Signup;
