import ArrowForward from "@mui/icons-material/ArrowForward";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import ErrorIcon from "@mui/icons-material/Error";
import TagIcon from "@mui/icons-material/Tag";

import INotification from "../../../interfaces/INotification";

import "./Notification.css";

interface INotificationProps {
  notification: INotification;
}

const Notification = ({ notification }: INotificationProps): JSX.Element => {
  const renderIcon = (): JSX.Element => {
    switch (notification.pathDescription) {
      case "LICENSER":
        return <ContactPhoneIcon className="icon" />;
      case "NUMMER":
        return <TagIcon className="icon" />;
      default:
        return <ErrorIcon className="icon" />;
    }
  };

  return (
    <div className="notification-container">
      <span className="notification-icon">{renderIcon()}</span>
      <span className="notification-desc">{notification.description}</span>
      <span className="notification-link-container">
        <a className="notification-link" href={notification.path}>
          <ArrowForward className="icon" />
        </a>
      </span>
    </div>
  );
};

export default Notification;
