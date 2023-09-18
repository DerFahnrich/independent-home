import React, { ReactNode } from "react";
import { ArrowForward } from "@mui/icons-material";

import "./WidgetHeader.css";

interface IWidgetHeaderProps {
  header: string;
  headerLink?: string;
  subHeader?: ReactNode;
}

const WidgetHeader = ({
  header,
  headerLink,
  subHeader,
}: IWidgetHeaderProps): JSX.Element => {
  const renderGotoButton = (): ReactNode => {
    if (headerLink) {
      return (
        <a className="goto-button" href={headerLink}>
          <ArrowForward className="icon" />
        </a>
      );
    }

    return null;
  };

  return (
    <header className="widget-header">
      <div className="header">
        <div className="header-text">{header}</div>
        {renderGotoButton()}
      </div>
      <span className="sub-header">{subHeader}</span>
    </header>
  );
};

export default WidgetHeader;
