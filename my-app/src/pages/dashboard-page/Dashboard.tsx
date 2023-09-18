import { useEffect, useState } from "react";

import "./Dashboard.css";
import "react-loading-skeleton/dist/skeleton.css";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import AppWidget from "./AppWidget/AppWidget";
import InvoiceWidget from "./InvoiceWidget/InvoiceWidget";
import NumbersWidget from "./NumbersWidget/NumbersWidget";
import PbxWidget from "./PbxWidget/PbxWidget";
import UserActivityWidget from "./UserActivityWidget/UserActivityWidget";
import UsersWidget from "./UsersWidget/UsersWidget";
import AddonWidget from "./addon-widget/AddonWidget";
import DashboardHeader from "./dashboard-header/DashboardHeader";
import LicenseWidget from "./license-widget/LicenseWidget";
import NotificationList from "./notifications-list/NotificationList";
import SupportWidget from "./support-widget/SupportWidget";
import dashboardService from "../../services/DashboardService";
import UsersService from "../../services/UsersService";
import { selectShowNotifications } from "../../dashboardSlice";
import { fetchCustomer } from "../../dashboardThunks";

const Dashboard = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const showNotifications = useAppSelector(selectShowNotifications);
  const [hasEconomyRight, setHasEconomyRight] = useState(false);

  useEffect(() => {
    dispatch(fetchCustomer());
    dashboardService.getLoggedInSession().then((session) => {
      const extensionId: number = session.extension.key.split("-")[1];
      UsersService.listUserRights([extensionId], ["INVOICE"]).then((right) => {
        setHasEconomyRight(right[0].userRights[0].active);
      });
    });
  }, []);

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      {showNotifications ? <NotificationList /> : null}
      <div className="dashboard-grid">
        <UsersWidget className="users" />
        <LicenseWidget className="licenses" />
        <PbxWidget className="pbx-services" />
        <SupportWidget className="support" />
        <NumbersWidget className="numbers" />
        <AddonWidget className="addons" />
        <AppWidget className="apps" />
        <UserActivityWidget className="user-activity" />
        {hasEconomyRight && <InvoiceWidget className="dashboard-invoices" />}
      </div>
    </div>
  );
};

export default Dashboard;
