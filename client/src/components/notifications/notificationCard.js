import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Accordion, AccordionSummary, AccordionDetails, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from "axios";
import { SET_NOTIFICATIONS } from '../../actions/types'

const NotificationCard = (props) => {
    const dispatch = useDispatch();
    // We aint using state anymore to re-render this. should be taken care of by store. 
    const notificationList = props.newEpisodes;

    const notificationState = useSelector(state => state.notifications);
    const notifications = notificationState.notifications;


    const removeEpisodeFromNotification = (episodeId) => {
        // First, find the notification object corresponding to the podcast id
        const filtered = notifications.map(notification => {
            if (notification.podcastId == props.podcastId) {
                // Now remove the notification for the episode we are acknowledging
                notification.newEpisodes = notification.newEpisodes.filter(episode => episode.id != episodeId);
            } 
            return notification;
        });
        dispatch({type: SET_NOTIFICATIONS, notifications: filtered});
    }

    const handleAcknowledge = (episodeId) => {
        console.log(`yeah you wanna delete ${episodeId}`)

        // axios.put(`/api/subscription/${props.subscriptionId}`, { acknowledgedEpisodeIds: [episodeId] }).then(res => {
        //     console.log('deleted successfully. changing the state now')
        //     const filtered = notificationList.filter(notification => notification.id != episodeId);
        //     setNotificationList(filtered);
            
        // })
        removeEpisodeFromNotification(episodeId);
    }

    return (
        notificationList.length > 0 ? 
        <Accordion> 
            <AccordionSummary  
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography> {props.podcastTitle} </Typography>
            </AccordionSummary>
            {       
                    notificationList.map( (episode,i) => {
                        return (
                            <AccordionDetails key={i}>
                                <Typography>{episode.name}</Typography>
                                <ClearIcon onClick={() => handleAcknowledge(episode.id)} style={{color: 'red', cursor: 'pointer'}}/>
                            </AccordionDetails>
                        )
                    })

                }
        </Accordion>
        : null
    )
}

export default NotificationCard;