import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";

import StandardWidget from "../../../common/standard-widget/StandardWidget";
import WidgetStandardContent from "../../../common/widget-content/WidgetStandardContent";
import WidgetHeader from "../../../common/widget-header/WidgetHeader";
import Row from "../../../interfaces/IRow";
import IWidgetStandardProps from "../../../interfaces/IWidgetStandardProps";
import NumbersService from "../../../services/NumbersService";

const NumbersWidget = ({ className }: IWidgetStandardProps) => {
  let numbersRows: Row[] = [];
  const { t } = useTranslation();
  const loadingTranslated = safeTranslate("general.loading") + "...";
  const header: string = safeTranslate(
    "admin_dashboard.numbers_widget.numbers"
  );

  numbersRows.push({
    id: 0,
    label: safeTranslate("admin_dashboard.numbers_widget.ongoing_portings"),
    additionalInfo: loadingTranslated,
  });

  numbersRows.push({
    id: 1,
    label: safeTranslate("admin_dashboard.numbers_widget.other_operators"),
    additionalInfo: loadingTranslated,
  });

  const [subHeader, setSubheader] = useState<string | JSX.Element>(
    <Skeleton width="30%" />
  );
  const [isLoading, setIsLoading] = useState(true);
  const [numberCounts, setNumberCounts] = useState(numbersRows);

  function safeTranslate(jsonPath: string): string {
    return t(jsonPath);
  }

  useEffect(() => {
    NumbersService.getDashboardMetaData()
      .then((numberManagementMetaData) => {
        setSubheader(numberManagementMetaData.flowNumberCount.toString());
        numbersRows = [];
        numbersRows.push({
          id: 0,
          label: safeTranslate(
            "admin_dashboard.numbers_widget.ongoing_portings"
          ),
          additionalInfo:
            numberManagementMetaData.portingsOngoingCount.toString(),
          link: "/phone_numbers.jsp#porting-ongoing",
        });

        numbersRows.push({
          id: 1,
          label: safeTranslate(
            "admin_dashboard.numbers_widget.other_operators"
          ),
          additionalInfo:
            numberManagementMetaData.otherOperatorCount.toString(),
          link: "/phone_numbers.jsp#other-operator",
        });

        setNumberCounts(numbersRows);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <StandardWidget className={className}>
      <WidgetHeader
        header={header}
        headerLink="/phone_numbers.jsp"
        subHeader={subHeader}
      />
      <WidgetStandardContent data={numberCounts} loading={isLoading} />
    </StandardWidget>
  );
};

export default NumbersWidget;
