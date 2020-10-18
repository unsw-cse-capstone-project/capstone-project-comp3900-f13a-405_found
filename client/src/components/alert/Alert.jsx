import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Alert.scss";
import { message } from "antd";

const Alert = () => {
  const alertState = useSelector((state) => state.alert);

  useEffect(() => {
    alertState.length > 0 &&
      alertState.map((a) =>
        message.error({ content: a.msg, key: a.id, duration: 4.5 })
      );
  }, [alertState]);
  return null;
};

export default Alert;
