import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import NotificationBox from "./notificationBox";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CircularProgress from "@material-ui/core/CircularProgress";
import Badge from "@material-ui/core/Badge";
import { SET_NOTIFICATIONS } from "../../actions/types";

const countNotifications = (notifications) => {
  let counter = 0;
  notifications.forEach((notification) => {
    counter += notification.newEpisodes.length;
  });
  return counter;
};

export const Notifications = () => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // API call to populate the notifications state in the store
    axios.get(`/api/notifications/`).then((res) => {
      if (res.data != null) {
        dispatch({ type: SET_NOTIFICATIONS, notifications: res.data });
      } else {
        dispatch({ type: SET_NOTIFICATIONS, notifications: [] });
        console.log("ERROR: There was a problem with loading notifications");
      }
      setLoading(false);
    });
  }, []);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Fetch notifications from the store
  const notificationsState = useSelector((state) => state.notifications);
  const notifications = notificationsState.notifications;

  return (
    <div
      style={{
        position: "absolute",
        right: "0",
        top: "0",
        zIndex: "4",
        width: "275px",
      }}
    >
      {isLoading ? (
        <CircularProgress
          style={{ position: "absolute", right: "0", top: "0", margin: "10px" }}
        />
      ) : (
        <>
          <Badge
            color='secondary'
            badgeContent={countNotifications(notifications)}
            style={{
              cursor: "pointer",
              display: "block",
              marginLeft: "auto",
              marginRight: "15px",
              marginTop: "15px",
            }}
          >
            <NotificationsIcon
              onClick={toggleExpanded}
              style={{
                cursor: "pointer",
                display: "block",
                marginLeft: "auto",
                marginRight: "15px",
                marginTop: "15px",
              }}
            />
          </Badge>
          <NotificationBox
            style={{
              zIndex: 15,
            }}
            notifications={notifications}
            expanded={expanded}
          />
        </>
      )}
    </div>
  );
};

export default Notifications;
