import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
// import { useTranslation } from "react-i18next";

import {
  DevicesOther,
  HeadsetMic,
  InsertLink,
  PersonSearch,
  Public,
  SimCard,
} from "@mui/icons-material";

import _ from "lodash";
import Row from "../../interfaces/IRow";
import IWidgetStandardProps from "../../interfaces/IWidgetStandardProps";
import AddOnCount from "../../models/addonModel";
import FeatureProduct from "../../models/featureModel";
import StandardWidget from "../../common/standard-widget/StandardWidget";
import WidgetStandardContent from "../../common/widget-content/WidgetStandardContent";
import WidgetHeader from "../../common/widget-header/WidgetHeader";
import MsTeams from "../../icons/MsTeams";
import TelavoxMobileData from "../../icons/TelavoxMobileData";
import TelavoxRecordedCalls from "../../icons/TelavoxRecordedCalls";

import MassEditService from "../../services/massEditService";
import DashboardService from "../../services/dashboardService";

const AddonWidget = ({ className }: IWidgetStandardProps) => {
  const { t } = useTranslation();
  const [addons, setAddons] = useState([] as Row[]);
  const [nbAddOns, setNbAddOns] = useState(0);
  const [loadingAddons, setLoadingAddons] = useState(true);

  const subHeader = loadingAddons ? (
    <Skeleton width="50%" />
  ) : (
    t("admin_dashboard.addons_widget.services", { nb: nbAddOns })
  );

  useEffect(() => {
    fetchAddonData();
  }, []);

  async function fetchAddonData() {
    // Fetch data
    const featureProducts = await MassEditService.getFeatureProducts();
    const addOnCount = await DashboardService.getAddonCount(
      featureProducts.map((feature) => feature.key)
    );

    // Sort Add-ons in the order specified in the specs
    const sortedFeatureProducts = _.sortBy(featureProducts, function (obj) {
      const index = _.indexOf(orderedAddOns, obj.name);
      return index > -1 ? index : undefined;
    });

    addRows(sortedFeatureProducts, addOnCount);
  }

  function addRows(featureProducts: FeatureProduct[], addOnCount: AddOnCount) {
    let sumAddOns = 0;
    let addonRows: Row[] = [];

    // Create Add-ons rows + sum amounts
    featureProducts.forEach((featureProduct, index) => {
      const matchingFeatureFlags = addOnCount.addonCountMap.filter(
        (featureCount) => featureProduct.key === featureCount.rsfName
      );
      let nbMatchingFeatureFlags = 0;
      if (matchingFeatureFlags && matchingFeatureFlags.length > 0) {
        nbMatchingFeatureFlags = matchingFeatureFlags[0].amount;
      }
      sumAddOns += nbMatchingFeatureFlags;
      addonRows = addAddonRow(
        addonRows,
        index,
        featureProduct,
        nbMatchingFeatureFlags
      );
    });

    // Update values
    setAddons([...addonRows]);
    setNbAddOns(sumAddOns);
    setLoadingAddons(false);
  }

  function addAddonRow(
    addonRows: Row[],
    id: number,
    featureProduct: FeatureProduct,
    amount: number
  ) {
    addonRows.push({
      id: id,
      label: featureProduct.description,
      icon: getRowIcon(featureProduct),
      additionalInfo: amount.toString(),
    });
    return addonRows;
  }

  const getRowIcon = (
    featureProduct: FeatureProduct
  ): React.ReactNode | undefined => {
    if (featureProduct.DTOSubtype === "SurfPackageFeatureProductDTO") {
      return <TelavoxMobileData />;
    }

    const addOn = addOns.find((icon) => icon.name === featureProduct.name);
    return addOn !== undefined ? addOn.icon : undefined;
  };

  return (
    <StandardWidget className={className}>
      <WidgetHeader
        header={t("admin_dashboard.addons_widget.addons")}
        headerLink="/tvx_massedit_app.jsp#!/featureproducts"
        subHeader={subHeader}
      />
      <WidgetStandardContent data={addons} loading={loadingAddons} />
    </StandardWidget>
  );
};

const addOns = [
  { name: "desktopcc", icon: <DevicesOther /> },
  { name: "recordcalls", icon: <TelavoxRecordedCalls /> },
  { name: "MS Teams", icon: <MsTeams /> },
  { name: "twinmbb", icon: <SimCard /> },
  { name: "lisa", icon: <HeadsetMic /> },
  { name: "cti_integration", icon: <InsertLink /> },
  { name: "outgoing_eu_flatrate", icon: <Public /> },
  { name: "contact_lookup", icon: <PersonSearch /> },
];

const orderedAddOns = [
  "desktopcc",
  "recordcalls",
  "MS Teams",
  "twinmbb",
  "lisa",
  "cti_integration",
  "outgoing_eu_flatrate",
  "contact_lookup",
];

export default AddonWidget;
