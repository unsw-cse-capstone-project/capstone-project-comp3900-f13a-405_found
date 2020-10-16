import React, { useState } from "react";
import { signup } from "../../actions/authentication";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Signup.css";

import Button from "@material-ui/core/Button";
import logo from "../landing/logo.png";
import Typography from "@material-ui/core/Typography";
import CustomTextField from "../CustomTextField";
import { makeStyles } from "@material-ui/core";

const Signup = () => {
  const useStyles = makeStyles((theme) => ({
    MR: {
      marginRight: "30px",
    },
  }));
  const classes = useStyles();

  const initialFValues = {
    id: 0,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const authenticationState = useSelector((state) => state.authentication);
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name =
        fieldValues.name.length < 4 ? "At least 4 characters required" : "";
    if ("email" in fieldValues)
      temp.email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(
        fieldValues.email
      )
        ? ""
        : "Email address is invalid.";
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length < 6 ? "At least 6 characters required" : "";
    if ("confirmPassword" in fieldValues)
      temp.confirmPassword =
        fieldValues.confirmPassword !== values.password
          ? "Passwords do not match!"
          : "";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const { id, name, email, password } = values;
      dispatch(signup({ name, email, password }));
      //resetForm()
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    //if (validateOnChange)
    validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  // redirect to dashboard if the user is authenticated
  if (authenticationState.isLoaded && authenticationState.isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='middle-column2'>
          <img src={logo} className='App-logo' alt='logo' />
          <Typography variant='h5' gutterBottom>
            {" "}
            Sign up for UltraCast{" "}
          </Typography>
          <CustomTextField
            name='name'
            label='Full Name'
            variant='outlined'
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
            //helperText={errors.name}
          />
          <p></p>
          <CustomTextField
            label='Email'
            name='email'
            variant='outlined'
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <p></p>
          <CustomTextField
            label='Password'
            name='password'
            variant='outlined'
            value={values.password}
            onChange={handleInputChange}
            error={errors.password}
            passwordViewable={true}
          />
          <p></p>
          <CustomTextField
            variant='outlined'
            label='Confirm Password'
            type='password'
            name='confirmPassword'
            value={values.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
          />
          <p></p>
          <Button
            size='large'
            variant='contained'
            color='primary'
            type='submit'
            className={classes.MR}
          >
            Submit
          </Button>
          <Button size='large' variant='contained' onClick={resetForm}>
            {" "}
            Reset
          </Button>
        </div>
      </div>
      <div></div>
    </form>
  );
};

export default Signup;
