import { ReactNode, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { fetchNotifications } from "../../../store/fetchNotifications";
import ISessionContact from "../../../interfaces/ISessionContact";
import NetworkService from "../../../services/NetworkService";

import {
  selectNotifications,
  selectNotificationsIsLoading,
  selectCustomer,
  selectCustomerIsLoading,
  selectShowNotifications,
  toggleShowNotifications,
} from "../../../store/dashboardSlice";

import "./DashboardHeader.css";

const DashboardHeader = (): JSX.Element => {
  const notifications = useAppSelector(selectNotifications);
  const notificationsIsLoading = useAppSelector(selectNotificationsIsLoading);

  const customer = useAppSelector(selectCustomer);
  const customerIsLoading = useAppSelector(selectCustomerIsLoading);

  const [sessionContact, setSessionContact] = useState<ISessionContact>(
    {} as ISessionContact
  );
  const [sessionContactIsLoading, setSessionContactIsLoading] = useState(true);

  const URLToSessionContact = "/api/internal/session/?include=contact";
  const notificationsCount = notifications.length;

  const dispatch = useAppDispatch();
  const showNotifications = useAppSelector(selectShowNotifications);
  const notificationsContainer = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const fetchSessionContact = async (): Promise<void> => {
    const response: Response = await NetworkService.sendGet(
      URLToSessionContact
    );
    const sessionContact: ISessionContact = await response.json();
    setSessionContact(sessionContact);
    setSessionContactIsLoading(false);
  };

  const handleOnClick = () => {
    const shouldToggleNotificationsList =
      notifications.length > 0 && !notificationsIsLoading;

    if (shouldToggleNotificationsList) {
      return dispatch(toggleShowNotifications());
    }
  };

  const renderCompanyName = (): JSX.Element => {
    if (customerIsLoading) {
      return (
        <span className="company">{t("admin_dashboard.header.loading")}</span>
      );
    }

    if (customer !== null) {
      return (
        <span className="company">{customer.companyAddress.companyname}</span>
      );
    }

    return <span className="company" />;
  };

  const renderNotificationsNumber = (): JSX.Element => {
    if (notificationsIsLoading) {
      return <CircularProgress className="notifications-loader" size={20} />;
    }

    if (showNotifications) {
      return <span className="notifications-number cancel">X</span>;
    }

    if (notifications.length > 0) {
      notificationsContainer.current?.classList.remove("disabled");
      return <span className="notifications-number">{notificationsCount}</span>;
    }

    notificationsContainer.current?.classList.add("disabled");
    return <span className="notifications-number">0</span>;
  };

  const renderNotificationsText = (): ReactNode => {
    if (notificationsIsLoading) {
      notificationsContainer.current?.classList.add("disabled");
      return null;
    } else {
      notificationsContainer.current?.classList.remove("disabled");
      notificationsContainer.current?.classList.add("loaded");
    }

    if (showNotifications) {
      return (
        <span className="notifications-text">
          {t("admin_dashboard.header.hide_notifications")}
        </span>
      );
    }

    if (notifications.length > 0) {
      return (
        <span className="notifications-text">
          {t("admin_dashboard.header.show_notifications")}
        </span>
      );
    }

    return (
      <span className="notifications-text">
        {t("admin_dashboard.header.no_notifications")}
      </span>
    );
  };

  const renderWelcomeText = (): JSX.Element => {
    if (sessionContactIsLoading) {
      return (
        <span className="welcome-text">
          {t("admin_dashboard.header.welcome_back")}...
        </span>
      );
    }

    return (
      <span className="welcome-text">
        {t("admin_dashboard.header.welcome_back")}{" "}
        {sessionContact.extension.contact.firstName}{" "}
        {sessionContact.extension.contact.lastName}!
      </span>
    );
  };

  useEffect(() => {
    dispatch(fetchNotifications());
    fetchSessionContact();
  }, []);

  return (
    <div className="dashboard-header">
      <div className="data-container">
        {renderWelcomeText()}
        {renderCompanyName()}
      </div>
      <div
        className="notifications-container"
        onClick={handleOnClick}
        ref={notificationsContainer}
      >
        <div
          className={`notifications-number-container ${
            showNotifications ? "hide" : ""
          }`}
        >
          {renderNotificationsNumber()}
        </div>
        {renderNotificationsText()}
      </div>
    </div>
  );
};

export default DashboardHeader;
