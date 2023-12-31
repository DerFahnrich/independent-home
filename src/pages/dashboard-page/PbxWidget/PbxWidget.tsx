import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Group, SettingsInputHdmi, Voicemail } from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";

import StandardWidget from "../../../common/standard-widget/StandardWidget";
import WidgetStandardContent from "../../../common/widget-content/WidgetStandardContent";
import WidgetHeader from "../../../common/widget-header/WidgetHeader";
import PbxIcon from "../../../icons/PbxIcon";
import TelavoxFax from "../../../icons/TelavoxFax";
import Row from "../../../interfaces/IRow";
import IWidgetStandardProps from "../../../interfaces/IWidgetStandardProps";
import PbxLicenseProduct from "../../../models/pbxLicenseProduct";
import FlowService from "../../../services/FlowService";
import DashboardService from "../../../services/DashboardService";

import "./PBXWidget.css";

const PbxWidget = ({ className }: IWidgetStandardProps) => {
  const { t } = useTranslation();
  let pbxRows: Row[] = [];
  let pbxSH = <div className="pbx-sub-header"></div>;
  const [pbx, setPbx] = useState(pbxRows);
  const [pbxSubHeader, setPbxSubHeader] = useState<string | JSX.Element>(
    <Skeleton width="75%" />
  );
  const [loadingPbx, setLoadingPbx] = useState(true);

  const PBX_SERVICES = t("pbxservices.pbx.pbx_services");
  const IVR: string = t("pbxservices.menu_options.refers");
  const QUEUES: string = t("pbxservices.menu_options.queues");
  const VOICEMAILS: string = t("pbxservices.menu_options.voicemails");
  const FAXES: string = t("pbxservices.menu_options.faxes");
  const SHARED_EXTENSIONS: string = t("pbxservices.menu_options.connections");

  useEffect(() => {
    FlowService.getPbxLicense().then((pbxLicense: PbxLicenseProduct) => {
      DashboardService.getPbxCount().then((pbxCount) => {
        const nb =
          pbxCount.nbrOfRefers +
          pbxCount.nbrOfQueues +
          pbxCount.nbrOfVoicemail +
          pbxCount.nbrOfFaxes +
          pbxCount.nbrOfSharedExtensions;
        pbxRows = addPbxRow(
          pbxRows,
          0,
          IVR,
          <PbxIcon></PbxIcon>,
          pbxCount.nbrOfRefers
        );
        pbxRows = addPbxRow(
          pbxRows,
          1,
          QUEUES,
          <Group></Group>,
          pbxCount.nbrOfQueues
        );
        pbxRows = addPbxRow(
          pbxRows,
          2,
          VOICEMAILS,
          <Voicemail></Voicemail>,
          pbxCount.nbrOfVoicemail
        );
        pbxRows = addPbxRow(
          pbxRows,
          3,
          FAXES,
          <TelavoxFax></TelavoxFax>,
          pbxCount.nbrOfFaxes
        );
        pbxRows = addPbxRow(
          pbxRows,
          4,
          SHARED_EXTENSIONS,
          <SettingsInputHdmi></SettingsInputHdmi>,
          pbxCount.nbrOfSharedExtensions
        );

        setPbx([...pbxRows]);

        let number = (
          <span>
            {nb} / {pbxLicense.pbxServiceLimit}
          </span>
        );
        if (pbxLicense.pbxServiceLimit >= 999) {
          number = <span>{nb}</span>;
        }
        pbxSH = (
          <div className="pbx-sub-header">
            {number}
            <a className="pbx-sub-header-button" href="/licenses.jsp#!/pbx">
              {pbxLicense.description}
            </a>
          </div>
        );
        setPbxSubHeader(pbxSH);
        setLoadingPbx(false);
      });
    });
  }, []);

  function addPbxRow(
    pbxRows: Row[],
    id: number,
    label: string,
    icon: JSX.Element,
    additionalInfo: string
  ) {
    pbxRows.push({
      id: id,
      label: label,
      icon: icon,
      additionalInfo: additionalInfo,
    });
    return pbxRows;
  }

  return (
    <StandardWidget className={`pbx-widget ${className ? className : ""}`}>
      <WidgetHeader
        header={PBX_SERVICES}
        headerLink="/pbxservices.jsp"
        subHeader={pbxSubHeader}
      />
      <WidgetStandardContent data={pbx} loading={loadingPbx} />
    </StandardWidget>
  );
};

export default PbxWidget;
