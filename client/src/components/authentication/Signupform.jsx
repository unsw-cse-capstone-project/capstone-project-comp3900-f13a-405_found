import React, { useState, useEffect } from "react";
import { signup } from "../../actions/authentication";
import { useDispatch, useSelector } from "react-redux";
import "./Signupform.css";
import { FormLabel, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import logo from "../landing/logo.png";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom";
import CustomTextField from "../CustomTextField";

const FormA = (initialValues, validateOnChange = false, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      height: 200,
      fontSize: "3em",
    },
  },
}));

const initialValues = {
  id: 0,
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignupForm() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const { id, name, email, password } = values;
      dispatch(signup({ name, email, password }));
    }
  };

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

  const { values, errors, setErrors, handleInputChange, resetForm } = FormA(
    initialValues,
    true,
    validate
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='middle-column2'>
          <img src={logo} className='App-logo' alt='logo' />
          <Typography component={"div"} variant='h5' gutterBottom>
            {" "}
            Sign up for UltraCast{" "}
          </Typography>
          <CustomTextField
            name='name'
            label='Full Name'
            variant='outlined'
            className={classes.root}
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <CustomTextField
            label='Email'
            name='email'
            variant='outlined'
            className={classes.root}
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <CustomTextField
            label='Password'
            name='password'
            variant='outlined'
            className={classes.root}
            value={values.password}
            onChange={handleInputChange}
            error={errors.password}
          />
          <CustomTextField
            variant='outlined'
            label='Confirm Password'
            name='confirmPassword'
            className={classes.root}
            value={values.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
          />
          <Button variant='contained' type='submit'>
            Submit
          </Button>
          <Button variant='contained' onClick={resetForm}>
            Reset
          </Button>
        </div>
      </div>
      <div></div>
    </form>
  );
}
