import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import NotificationBox from "./notificationBox";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CircularProgress from "@material-ui/core/CircularProgress";

export const Notifications = () => {
  const [expanded, setExpanded] = useState(false);
  const authstate = useSelector((state) => state.authentication);
  const [isLoading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get(`/api/notifications/${authstate.user._id}`).then((res) => {
      setNotifications(res.data);
      setLoading(false);
    });
  }, []);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{ position: "absolute", right: "0", top: "0" }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <NotificationsIcon
            onClick={toggleExpanded}
            style={{
              cursor: "pointer",
              display: "block",
              marginLeft: "auto",
              marginRight: "0",
            }}
          />
          <NotificationBox notifications={notifications} expanded={expanded}/>
        </>
      )}

      {/* CHANGE data BACK to notifications after testing */}
    </div>
  );
};

export default Notifications;
