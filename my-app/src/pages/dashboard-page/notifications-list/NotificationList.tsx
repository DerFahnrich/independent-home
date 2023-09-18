import { selectNotifications } from "../../../dashboardSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";
import Notification from "./Notification";

import "./NotificationList.css";

const NotificationList = (): JSX.Element => {
  const notifications = useAppSelector(selectNotifications);

  return (
    <div className="notification-list">
      {notifications.map((n, i) => (
        <Notification key={i} notification={n} />
      ))}
    </div>
  );
};

export default NotificationList;
