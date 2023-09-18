import React from "react";
import "./WidgetLinkRow.css";

interface IWidgetLinkRowProps {
    icon?: React.ReactNode;
    label?: string;
    link?: string;
}

const WidgetLinkRow = ({icon, label, link}: IWidgetLinkRowProps): JSX.Element => {
    return (
        <a className="widget-link-row two-col-reversed widget-link" href={link}>
            <span className="widget-icon">{icon}</span>
            <span className="ellipsis">{label}</span>
        </a>
    )
}

export default WidgetLinkRow;
