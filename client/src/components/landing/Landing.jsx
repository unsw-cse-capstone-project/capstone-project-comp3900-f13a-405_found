import logo from "./logo.png";
import React, { useState, useEffect } from "react";
import { login } from "../../actions/authentication";
import "./Landing.scss";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import CustomTextField from "../CustomTextField";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoginComp = () => {
  const initialFValues = {
    email: "",
    password: "",
  };

  const authenticationState = useSelector((state) => state.authentication);
  const useStyles = makeStyles((theme) => ({
    root: {
      "&.MuiButton-root": {
        display: "block",
        margin: "auto",
        minWidth: "150px",
        marginTop: "10px",
      },
      "&a": {
        color: "black",
      },
    },
  }));

  const [values, setValues] = useState(initialFValues);
  const classes = useStyles();

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const [share_id, setShare_id] = useState();

  useEffect(() => {
    const share_exists = localStorage.getItem("share_set") === "true";
    const shareId = share_exists ? localStorage.getItem("share_id") : null;
    setShare_id(shareId);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const { email, password } = values;
      dispatch(login({ email, password }));
    }
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("email" in fieldValues)
      temp.email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(
        fieldValues.email
      )
        ? ""
        : "Email address is invalid.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  // redirect to dashboard if the user is authenticated
  if (authenticationState.isLoaded && authenticationState.isAuthenticated) {
    // If there is a share_id stored, then we want to redirect there instead
    return (
      <Redirect
        to={share_id != null ? `/dashboard/share/${share_id}` : "/dashboard"}
      />
    );
  }
  if (!authenticationState.isLoaded)
    return (
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
    );
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='row'>
          <div className='middle-column'>
            <img src={logo} className='App-logo' alt='logo' />
            <Typography component={"div"} variant='h5' gutterBottom>
              {" "}
              UltraCast{" "}
            </Typography>
            <form className='loginForm' onSubmit={handleSubmit}>
              <div>
                <CustomTextField
                  label='Email'
                  name='email'
                  variant='outlined'
                  value={values.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
                <CustomTextField
                  label='Password'
                  name='password'
                  type='password'
                  variant='outlined'
                  value={values.password}
                  onChange={handleInputChange}
                  error={errors.password}
                />
              </div>
              <div className='loginForm-buttons'>
                <Button
                  className={classes.root}
                  size='large'
                  variant='contained'
                  type='submit'
                >
                  Login
                </Button>{" "}
                <Link style={{ textDecoration: "none" }} to='/signup'>
                  <Button
                    className={classes.root}
                    color='primary'
                    size='large'
                    variant='contained'
                  >
                    Sign Up
                  </Button>
                </Link>{" "}
              </div>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
};

export default LoginComp;
