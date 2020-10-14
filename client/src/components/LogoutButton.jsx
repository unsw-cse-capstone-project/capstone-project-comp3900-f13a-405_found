import React from "react";
import { logout } from "../actions/authentication";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Button
      size='large'
      onClick={handleLogout}
      variant='contained'
      type='submit'
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
