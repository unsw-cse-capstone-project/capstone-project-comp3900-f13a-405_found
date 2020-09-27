import React, { Fragment, useEffect, useState } from "react";
import { signup } from "../../actions/authentication";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "./Signup.scss";

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
  const dispatch = useDispatch();

  useEffect(() => {
    setIsDisabled(checkFormErrors());
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = signupForm;
    dispatch(signup({ name, email, password }));
  };

  const checkFormErrors = () => {
    for (const [key, value] of Object.entries(signupForm)) {
      if (value.length == 0) {
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

  const onFormChange = (e) => {
    const regExp = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
    e.preventDefault();
    const { name, value } = e.target;
    let errorsList = { ...errors };

    switch (name) {
      case "name":
        errorsList.name =
          value.length < 4 ? "Atleast 4 characaters required" : "";
        break;
      case "email":
        errorsList.email = regExp.test(value) ? "" : "Email address is invalid";
        break;
      case "password":
        errorsList.password =
          value.length < 6 ? "Atleast 6 characaters required" : "";
        break;
      case "confirmPassword":
        errorsList.confirmPassword =
          value !== signupForm.password ? "Passwords do not match!" : "";
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
    <Container>
      <h2>Sign up!</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className='form-group'>
          <label>Name</label>
          <input
            type='text'
            className={
              errors.name.length > 0
                ? "is-invalid form-control"
                : "form-control"
            }
            name='name'
            onChange={onFormChange}
          />
          {errors.name.length > 0 && (
            <span className='invalid-feedback'>{errors.name}</span>
          )}
        </div>

        <div className='form-group'>
          <label>Email</label>
          <input
            type='email'
            className={
              errors.email.length > 0
                ? "is-invalid form-control"
                : "form-control"
            }
            name='email'
            onChange={onFormChange}
          />
          {errors.email.length > 0 && (
            <span className='invalid-feedback'>{errors.email}</span>
          )}
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            className={
              errors.password.length > 0
                ? "is-invalid form-control"
                : "form-control"
            }
            name='password'
            onChange={onFormChange}
          />
          {errors.password.length > 0 && (
            <span className='invalid-feedback'>{errors.password}</span>
          )}
        </div>

        <div className='form-group'>
          <label>Confirm Password</label>
          <input
            type='password'
            className={
              errors.confirmPassword.length > 0
                ? "is-invalid form-control"
                : "form-control"
            }
            name='confirmPassword'
            onChange={onFormChange}
          />
          {errors.confirmPassword.length > 0 && (
            <span className='invalid-feedback'>{errors.confirmPassword}</span>
          )}
        </div>

        <button disabled={isDisabled} type='submit' className='btn btn-primary'>
          Create User
        </button>
      </form>
    </Container>
  );
};

export default Signup;
