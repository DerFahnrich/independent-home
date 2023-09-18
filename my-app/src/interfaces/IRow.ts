import React from "react";

export default interface Row {
    id: number;
    icon?: React.ReactNode;
    label?: string;
    additionalInfo?: string;
    isDivider?: boolean;
    class?: string;
    link?: string;
    entityKey?: string;
}
