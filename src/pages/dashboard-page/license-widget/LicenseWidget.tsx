import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

import StandardWidget from "../../../common/standard-widget/StandardWidget";
import WidgetStandardContent from "../../../common/widget-content/WidgetStandardContent";
import WidgetHeader from "../../../common/widget-header/WidgetHeader";
import Row from "../../../interfaces/IRow";
import IWidgetStandardProps from "../../../interfaces/IWidgetStandardProps";
import License from "../../../models/licenseModel";
import LicenseService from "../../../services/LicenseService";

const LicenseWidget = ({ className }: IWidgetStandardProps) => {
  const { t } = useTranslation();
  const [licenses, setLicenses] = useState<Row[]>([]);
  const [loadingLicenses, setLoadingLicenses] = useState(true);

  const [nbLicenses, setNbLicenses] = useState<number | JSX.Element>(
    <Skeleton width="25%" />
  );

  const link = "/licenses.jsp";

  useEffect(() => {
    fetchLicenses();
  }, []);

  async function fetchLicenses() {
    // Fetch data
    const licenses = await LicenseService.getLicensesSimple();
    const licensesRow = licenses.map((license: License, index: number) => ({
      id: index,
      label: license.description,
      additionalInfo: license.count.toString(),
      link: link + "#!/" + license.name.substring(5),
    }));

    const licensesCount = licenses.reduce(
      (count: number, license: License) => count + license.count,
      0
    );

    setLicenses(licensesRow);
    setNbLicenses(licensesCount);
    setLoadingLicenses(false);
  }

  return (
    <StandardWidget className={className}>
      <WidgetHeader
        header={t("licenses.general.licenses")}
        headerLink={link}
        subHeader={nbLicenses}
      />
      <WidgetStandardContent data={licenses} loading={loadingLicenses} />
    </StandardWidget>
  );
};

export default LicenseWidget;
