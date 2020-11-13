import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { signup } from "../../actions/authentication";
import "./Landing.scss";
import logo from "./logo.png";

const EmailLanding = () => {
  const authState = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const handleResent = () => {
    const id = uuid();
    message.loading({ content: "Loading...", key: id });
    dispatch(signup({ ...authState.userResentEmail, id }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="row">
          <div className="middle-column">
            <img src={logo} className="App-logo" alt="logo" />
            <Typography component={"div"} variant="h5" gutterBottom>
              {" "}
              UltraCast{" "}
            </Typography>
            <div style={{ padding: "16px" }}>
              Please check your email inbox to confirm your account. Then log in
              below!
            </div>
            <Link style={{ textDecoration: "none" }} to="/">
              <Button size="large" variant="contained">
                Log In
              </Button>
            </Link>{" "}
            <div
              style={{ padding: "16px" }}
              className="link"
              onClick={handleResent}
            >
              <Button size="large" variant="contained">
                Resend email
              </Button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default EmailLanding;
