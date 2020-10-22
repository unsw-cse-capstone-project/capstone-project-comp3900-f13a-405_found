import React, { useState } from "react";
import NotificationBox from './notificationBox';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import NotificationsIcon from '@material-ui/icons/Notifications';

export const Notifications = () => {
    const [expanded, setExpanded] = useState(false);
    
    const toggleExpanded = () => {
        setExpanded(!expanded);
    }

    return (
        <div style={{position: 'absolute', right: '0', top: '0'}}>
            <NotificationsIcon onClick={toggleExpanded} style={{cursor: 'pointer', display: 'block', marginLeft: 'auto', marginRight: '0'}}/>
            {   
                expanded ? <NotificationBox style={{}}/> : null
            }
            
        </div>
        
    )
}

export default Notifications;