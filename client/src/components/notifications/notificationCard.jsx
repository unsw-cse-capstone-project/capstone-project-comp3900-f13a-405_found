import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ClearIcon from "@material-ui/icons/Clear";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import { SET_NOTIFICATIONS } from "../../actions/types";

const NotificationCard = (props) => {
  const dispatch = useDispatch();
  // We aint using state anymore to re-render this. should be taken care of by store.
  const notificationList = props.newEpisodes;

  const notificationState = useSelector((state) => state.notifications);
  const notifications = notificationState.notifications;

  const removeEpisodeFromNotification = (episodeId) => {
    // First, find the notification object corresponding to the podcast id
    const filtered = notifications.map((notification) => {
      if (notification.podcastId === props.podcastId) {
        // Now remove the notification for the episode we are acknowledging
        notification.newEpisodes = notification.newEpisodes.filter(
          (episode) => episode.id !== episodeId
        );
      }
      return notification;
    });
    dispatch({ type: SET_NOTIFICATIONS, notifications: filtered });
  };

  const handleAcknowledge = (episodeId) => {
    axios
      .put(`/api/subscription/${props.subscriptionId}`, {
        acknowledgedEpisodeIds: [episodeId],
      })
      .then((res) => {
        removeEpisodeFromNotification(episodeId);
      });
  };

  return notificationList.length > 0 ? (
    <Accordion style={{backgroundColor: '#292929', color: 'white', marginRight: '5px'}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{color: 'white'}}/>}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography component={"div"}> {props.podcastTitle} </Typography>
      </AccordionSummary>
      {notificationList.map((episode, i) => {
        return (
          <AccordionDetails key={i}>
            <Typography component={"div"}>{episode.name}</Typography>
            <ClearIcon
              onClick={() => handleAcknowledge(episode.id)}
              style={{ color: "red", cursor: "pointer" }}
            />
          </AccordionDetails>
        );
      })}
    </Accordion>
  ) : null;
};

export default NotificationCard;
