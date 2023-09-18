import React from "react";
import WidgetDivider from "@commons/widget-content/widget-divider/WidgetDivider";
import "./WidgetStandardRow.css";

interface IWidgetStandardRowProps {
    additionalInfo?: string;
    icon?: React.ReactNode;
    isDivider?: boolean;
    label?: string;
    link?: string;
}

const WidgetStandardRow = (props: IWidgetStandardRowProps): JSX.Element => {

    if (props.isDivider) {
        return <WidgetDivider/>;
    }

    if (props.icon && props.link) {
        return (
            <a className="widget-standard-row three-col widget-link" href={props.link}>
                <span className="widget-icon">{props.icon}</span>
                <span className="widget-row-label ellipsis">{props.label}</span>
                <span className="widget-additional-info">{props.additionalInfo}</span>
            </a>
        )
    }

    if (!props.icon && props.link) {
        return (
            <a className="widget-standard-row two-col widget-link" href={props.link}>
                <span className="widget-row-label ellipsis">{props.label}</span>
                <span className="widget-additional-info">{props.additionalInfo}</span>
            </a>
        )
    }

    if (!props.icon) {
        return (
            <div className="widget-standard-row two-col">
                <span className="widget-row-label ellipsis">{props.label}</span>
                <span className="widget-additional-info">{props.additionalInfo}</span>
            </div>
        )
    }

    return (
        <div className="widget-standard-row three-col">
            <span className="widget-icon">{props.icon}</span>
            <span className="widget-row-label ellipsis">{props.label}</span>
            <span className="widget-additional-info">{props.additionalInfo}</span>
        </div>
    )
}

export default WidgetStandardRow;
