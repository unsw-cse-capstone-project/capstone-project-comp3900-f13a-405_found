import React, { useEffect, useState } from "react";
import { signup } from "../../actions/authentication";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Signup.scss";
import mySignup from "./Signupform"

const Signup = () => {
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [isDisabled, setIsDisabled] = useState(true);
  const [errors, setFormErrors] = useState(initialFormData);

  const [signupForm, setSignupForm] = useState(initialFormData);
  const authenticationState = useSelector((state) => state.authentication);
  //const dispatch = useDispatch();

  useEffect(() => {
    const checkFormErrors = () => {
      for (const [key, value] of Object.entries(signupForm)) {
        if (value.length === 0) {
          return true;
        }
      }
      for (const [key, value] of Object.entries(errors)) {
        if (value.length > 0) {
          return true;
        }
      }
      return false;
    };

    setIsDisabled(checkFormErrors());
  }, [errors, signupForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = signupForm;
    //dispatch(signup({ name, email, password }));
  };

  const onFormChange = (e) => {
    const regExp = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
    e.preventDefault();
    const { name, value } = e.target;
    let errorsList = { ...errors };

    switch (name) {
      case "name":
        errorsList.name =
          value.length < 4 ? "At least 4 characters required" : "";
        break;
      case "email":
        errorsList.email = regExp.test(value) ? "" : "Email address is invalid";
        break;
      case "password":
        errorsList.password =
          value.length < 6 ? "At least 6 characters required" : "";
        break;
      case "confirmPassword":
        errorsList.confirmPassword =
          value !== signupForm.password ? "Passwords do not match!" : "";
        break;
      default:
        break;
    }
    setSignupForm({ ...signupForm, [name]: value });
    setFormErrors(errorsList);
  };

  // redirect to dashboard if the user is authenticated
  if (authenticationState.isLoaded && authenticationState.isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    mySignup()
  );
};

export default Signup;
