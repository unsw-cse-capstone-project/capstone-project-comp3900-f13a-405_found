import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Alert.scss";
import { removeAlert } from "../../actions/alert";
import AlertBootstrap from "react-bootstrap/Alert";
const Alert = () => {
  const alertState = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  return (
    alertState !== null &&
    alertState.length > 0 &&
    alertState.map((alert) => (
      <AlertBootstrap
        variant={alert.alertType}
        onClose={() => {
          dispatch(removeAlert(alert.id));
        }}
        dismissible
      >
        <AlertBootstrap.Heading>
          Oh snap! You got an error!
        </AlertBootstrap.Heading>
        <p>{alert.msg}</p>
      </AlertBootstrap>
    ))
  );
};

export default Alert;
/* <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
        <div
          className='cross-button'
          onClick={() => {
            dispatch(removeAlert(alert.id));
          }}
        >
          X
        </div>
</div> */
