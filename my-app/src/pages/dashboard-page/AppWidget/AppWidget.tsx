import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

import StandardWidget from "../../../common/standard-widget/StandardWidget";
import WidgetLinksContent from "../../../common/widget-content/WidgetLinksContent";
import WidgetHeader from "../../../common/widget-header/WidgetHeader";
import Row from "../../../interfaces/IRow";
import IWidgetStandardProps from "../../../interfaces/IWidgetStandardProps";
import appStoreEntry from "../../../models/appStoreEntryModel";
import AppsService from "../../../services/AppsService";

import "./AppWidget.css";

const AppWidget = ({ className }: IWidgetStandardProps): JSX.Element => {
  const { t } = useTranslation();
  const [appRows, setApps] = useState<Row[]>([] as Row[]);
  const [nbrInstalled, setNbrInstalled] = useState(0);
  const [loadingApps, setLoadingApps] = useState(true);
  const popular: string = t("admin_dashboard.apps_widget.popular");

  const subHeader = loadingApps ? (
    <Skeleton width="50%" />
  ) : (
    t("admin_dashboard.apps_widget.installed", { nb: nbrInstalled })
  );

  useEffect(() => {
    AppsService.getAllAvailableApps().then((apps) => {
      const installed: Array<appStoreEntry> = [...apps.appStoreEntries].filter(
        (app: appStoreEntry) => app.state === "installed"
      );
      const available: Array<appStoreEntry> = [...apps.appStoreEntries]
        .filter((app: appStoreEntry) => app.state === "available")
        .slice(0, 3);
      let displayApps;
      let linkPath;

      if (installed.length > 0) {
        displayApps = installed;
        linkPath = "integrations";
      } else {
        displayApps = available;
        linkPath = "applications";
      }

      let index = 0;
      for (const app of displayApps) {
        appRows.push({
          id: index,
          label: app.name,
          icon: <img src={app.icon} alt="App icon" />,
          link: "/app-directory.jsp#/" + linkPath + "/" + app.key,
        });
        index++;
      }

      setApps(appRows);
      setNbrInstalled(installed.length);
      setLoadingApps(false);
    });
  }, []);

  return (
    <StandardWidget className={className}>
      <WidgetHeader
        header={t("admin_dashboard.apps_widget.apps")}
        headerLink="/app-directory.jsp"
        subHeader={subHeader}
      />
      {nbrInstalled === 0 && !loadingApps && (
        <div className="popular-apps">{popular}</div>
      )}
      <WidgetLinksContent data={appRows} loading={loadingApps} />
    </StandardWidget>
  );
};

export default AppWidget;
