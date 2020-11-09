import logo from "./logo.png";
import React, { useState, useEffect } from "react";
import "./Landing.scss";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions/authentication";
import { v4 as uuid } from "uuid";
import { message } from "antd";
const EmailLanding = () => {
  const authState = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const handleResent = () => {
    const id = uuid();
    message.loading({ content: "Loading...", key: id });
    dispatch(signup({ ...authState.userResentEmail, id }));
  };

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
            <div>Email has been sent to your acc, check and click please!</div>
            <Link style={{ textDecoration: "none" }} to='/'>
              <Button size='large' variant='contained'>
                Log In
              </Button>
            </Link>{" "}
            <div className='link' onClick={handleResent}>
              click here to resend email!
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default EmailLanding;
