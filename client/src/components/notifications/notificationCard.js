import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from "axios";

const NotificationCard = (props) => {
    const [notificationList, setNotificationList] = useState(props.newEpisodes);

    const handleAcknowledge = (episodeId) => {
        console.log(`yeah you wanna delete ${episodeId}`)

        axios.put(`/api/subscription/${props.subscriptionId}`, { acknowledgedEpisodeIds: [episodeId] }).then(res => {
            console.log('deleted successfully. changing the state now')
            const filtered = notificationList.filter(notification => notification.id != episodeId);
            setNotificationList(filtered);
            
        })
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