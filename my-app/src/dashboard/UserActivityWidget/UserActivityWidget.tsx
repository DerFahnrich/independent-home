import React, {useEffect, useState} from 'react';
import Skeleton from "react-loading-skeleton";
import {useTranslation} from "react-i18next";
import {SxProps} from "@mui/material/styles";

import BorderLinearProgress from "@commons/BorderLinearProgress";
import StandardWidget from "@commons/standard-widget/StandardWidget";
import WidgetHeader from "@commons/widget-header/WidgetHeader";
import ILoginStatistics from "@interfaces/ILoginStatistics";
import IWidgetStandardProps from "@interfaces/IWidgetStandardProps";
import DashboardService from "@services/dashboardService";

import "./UserActivityWidget.css";

const UserActivityWidget = ({className}: IWidgetStandardProps) => {
    const {t} = useTranslation();
    const [loggedInUsers, setLoggedInUsers] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [appLink, setAppLink] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const userActivity = t('flowdashboard.statistics_widget.user_activity');
    const subHeader: string | JSX.Element = isLoading ? <Skeleton width="30%"/> : `${percentage}%`;

    const customStyling: SxProps = {
        backgroundColor: "var(--app-main-color)",
    }

    useEffect(() => {
        setData();
    }, []);

    async function setData() {
        const branding = await DashboardService.getBranding();
        const appLink = branding.urls.appDownload.url || "https://www.joinflow.com/apps/";

        const statistics: ILoginStatistics = await DashboardService.getLoginStatistics();
        const loggedInNbr: number = statistics.loggedInAccounts
        const totalNbr: number = statistics.totalNumberOfAccounts;

        setLoggedInUsers(loggedInNbr);
        setTotalUsers(totalNbr);
        setPercentage(Math.round(loggedInNbr / totalNbr * 100));
        setAppLink(appLink)
        setIsLoading(false);
    }

    return (
        <StandardWidget className={className}>
            <WidgetHeader
                header={userActivity}
                subHeader={subHeader}
            />
            <div className="user-activity-widget-container">
                <BorderLinearProgress
                    className="progress-user-activity"
                    sx={customStyling}
                    value={percentage}
                    variant='determinate'
                />
                <div className="logged-in-users">
                    {
                        isLoading
                            ? <Skeleton/>
                            : <span>{loggedInUsers} / {totalUsers} {t('flowdashboard.statistics_widget.users_logged_in')}</span>
                    }
                </div>
                <div className="button-container">
                    <a
                        className="link-button"
                        href={appLink}
                        rel="noreferrer"
                        target="_blank"
                    >
                        {t('flowdashboard.statistics_widget.discover_apps')}
                    </a>
                    <a
                        className="link-button"
                        href="/api/internal/redirect/toFlowApp"
                        rel="noreferrer"
                        target="_blank"
                    >
                        {t('flowdashboard.statistics_widget.open_web_app')}
                    </a>
                </div>
            </div>
        </StandardWidget>
    );
};

export default UserActivityWidget;
