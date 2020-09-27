import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Alert.scss";
import { removeAlert } from "../../actions/alert";
import Container from "react-bootstrap/Container";
const Alert = () => {
  const alertState = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  return (
    alertState !== null &&
    alertState.length > 0 &&
    alertState.map((alert) => (
      <Container key={alert.id}>
        <div className={`alert alert-${alert.alertType}`}>
          {alert.msg}
          <div
            className='cross-button'
            onClick={() => {
              dispatch(removeAlert(alert.id));
            }}
          >
            X
          </div>
        </div>
      </Container>
    ))
  );
};

export default Alert;
