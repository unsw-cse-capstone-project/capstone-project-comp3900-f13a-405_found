import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions/authentication";
import { v4 as uuid } from "uuid";
import { message } from "antd";
import "./PleaseClickEmail.scss";
const PleaseClickEmail = () => {
  const authState = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const handleResent = () => {
    const id = uuid();
    message.loading({ content: "Loading...", key: id });
    dispatch(signup({ ...authState.userResentEmail, id }));
  };
  return (
    <>
      <div>Email has been sent to your acc, check and click please!</div>
      <div className='link' onClick={handleResent}>
        click here to resend email!
      </div>
    </>
  );
};

export default PleaseClickEmail;
