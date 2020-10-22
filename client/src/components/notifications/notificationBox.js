import React from "react";
import NotificationCard from './notificationCard';
const axios = require("axios");

const NotificationBox = (props) => {
   const notifications = props.notifications;
    return (
        <div style={{display: props.expanded ? 'block' : 'none'}}>
            {   notifications.length == 0 ? 
                <p>No new notifications</p>
                : notifications.map( (notification,i) => <NotificationCard key={i} {...notification} />)
            } 
        </div>
    );
}

export default NotificationBox;