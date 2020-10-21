import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const NotificationCard = (props) => {
    const cardStyle = {
        width: '100%',
        backgroundColor: 'white'
    }
    
    return (
        <Accordion> 
            <AccordionSummary  
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography> {props.podcastTitle} </Typography>
            </AccordionSummary>
            {
                    props.newEpisodes.map(episode => {
                        return (
                            <AccordionDetails>
                                <Typography>{episode.name}</Typography>
                                <ClearIcon style={{color: 'red', cursor: 'pointer'}}/>
                            </AccordionDetails>
                        )
                    })

                }
        </Accordion>
    )
}

export default NotificationCard;