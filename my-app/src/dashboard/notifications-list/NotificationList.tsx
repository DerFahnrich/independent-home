import React from "react";

import Notification from "@components/dashboard/notifications-list/Notification";
import useAppSelector from "@hooks/useAppSelector";
import {selectNotifications} from "@store/dashboard-store/dashboardSlice";

import "./NotificationList.css";

const NotificationList = (): JSX.Element => {
    const notifications = useAppSelector(selectNotifications);

    return (
        <div className="notification-list">
            {notifications.map((n, i) => (<Notification key={i} notification={n}/>))}
        </div>
    )
};

export default NotificationList;
