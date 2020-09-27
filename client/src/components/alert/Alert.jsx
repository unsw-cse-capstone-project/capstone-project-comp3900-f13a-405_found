import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Alert.scss";
import { removeAlert } from "../../actions/alert";

const Alert = () => {
  const alertState = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  return (
    alertState !== null &&
    alertState.length > 0 &&
    alertState.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
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
    ))
  );
};

export default Alert;
