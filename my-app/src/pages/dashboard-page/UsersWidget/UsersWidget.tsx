import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { People } from "@mui/icons-material";
import StandardWidget from "../../../common/standard-widget/StandardWidget";
import WidgetStandardContent from "../../../common/widget-content/WidgetStandardContent";
import WidgetHeader from "../../../common/widget-header/WidgetHeader";
import Row from "../../../interfaces/IRow";
import IWidgetStandardProps from "../../../interfaces/IWidgetStandardProps";
import Country from "../../../models/countryModel";
import AbbreviatedExtension from "../../../models/extensionModel";
import UserRight from "../../../models/rightsModel";
import UsersService from "../../../services/UsersService";

interface LicensesCountry {
  country: string;
  count: number;
}

const UsersWidget = ({ className }: IWidgetStandardProps): JSX.Element => {
  const { t } = useTranslation();
  const [userRows, setUsers] = useState<Row[]>([] as Row[]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [totalUsers, setTotalUsers] = useState<number | JSX.Element>(
    <Skeleton width="25%" />
  );

  const baseLink = "/tvx_massedit_app.jsp";

  useEffect(() => {
    setData();
  }, []);

  async function setData() {
    const extensions = await UsersService.listAbbreviatedExtensions();
    const extensionIds: number[] = extensions.map((extension) =>
      Number(extension.key.split("-")[1])
    );
    const licensesPerCountryKey = mapExtensionsToCountries(extensions);

    const countries = await UsersService.listCountries();
    const licensesPerCountry = populateLicenseCountryMap(
      countries,
      licensesPerCountryKey
    );

    const userRights = await UsersService.listUserRights(extensionIds, [
      "ADMIN",
    ]);
    const userRows = await populateRows(userRights, licensesPerCountry);

    setUsers(userRows);
    setLoadingUsers(false);
    setTotalUsers(extensions.length);
  }

  function mapExtensionsToCountries(
    extensions: AbbreviatedExtension[]
  ): Map<string, number> {
    const licensesPerCountryKey = new Map();
    extensions.forEach((extension) => {
      const countryKey = extension.countryEntityKey;
      if (!licensesPerCountryKey.has(countryKey)) {
        licensesPerCountryKey.set(countryKey, 1);
      } else {
        const count = licensesPerCountryKey.get(countryKey) + 1;
        licensesPerCountryKey.set(countryKey, count);
      }
    });
    return licensesPerCountryKey;
  }

  function populateLicenseCountryMap(
    countries: Country[],
    licensesPerCountryKey: Map<string, number>
  ): LicensesCountry[] {
    const licensesPerCountry: LicensesCountry[] = [];

    countries = countries.filter((country) => country.isTelavoxLocalOperator);
    countries.sort((a, b) => {
      return a.description.localeCompare(b.description);
    });

    countries.forEach((country) => {
      const value = licensesPerCountryKey.get(country.key);
      let count = value !== undefined ? value : 0;
      const countryWithSameDescription = licensesPerCountry.find(
        (c) => c.country === country.description
      );
      if (countryWithSameDescription) {
        count += countryWithSameDescription.count;
        const sameDescIndex = licensesPerCountry.findIndex(
          (c) => c.country === country.description
        );
        licensesPerCountry[sameDescIndex].count = count;
      } else {
        licensesPerCountry.push({ country: country.description, count: count });
      }
    });

    licensesPerCountry.sort((a, b) => b.count - a.count);
    return licensesPerCountry;
  }

  async function populateRows(
    userRights: UserRight[],
    licensesPerCountry: LicensesCountry[]
  ): Promise<Row[]> {
    const nbrAdmins = userRights.filter(
      (right) => right.userRights[0].active
    ).length;

    const adminLabel = t("admin_dashboard.users_widget.admins");
    const userRows: Row[] = [
      {
        id: 0,
        label: adminLabel,
        additionalInfo: nbrAdmins.toString(),
        icon: <People />,
        link: baseLink + "#!/rights",
      },
      {
        id: 1,
        isDivider: true,
      },
    ];

    let index = 2;
    licensesPerCountry.forEach((country) => {
      userRows.push({
        id: index,
        label: country.country,
        additionalInfo: country.count.toString(),
        link: baseLink + "#!/license",
      });
      index++;
    });

    return userRows;
  }

  return (
    <StandardWidget className={className}>
      <WidgetHeader
        header={t("admin_dashboard.users_widget.users")}
        headerLink={baseLink}
        subHeader={totalUsers}
      />
      <WidgetStandardContent data={userRows} loading={loadingUsers} />
    </StandardWidget>
  );
};

export default UsersWidget;
