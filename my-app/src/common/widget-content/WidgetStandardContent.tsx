import React from "react";

import WidgetContentSkeleton from "@commons/widget-content/widget-content-skeleton/WidgetContentSkeleton";
import WidgetStandardRow from "@commons/widget-content/widget-rows/WidgetStandardRow";
import WidgetFooter from "@commons/widget-footer/WidgetFooter";
import useFooter from "@hooks/useFooter";
import Row from "@interfaces/IRow";

interface IWidgetStandardContentProps {
    data: Row[]
    loading: boolean;
}

const WidgetStandardContent = ({data, loading}: IWidgetStandardContentProps): JSX.Element => {
    const {disabledButtons, slicedData, updateIndex} = useFooter(data);

    if (loading) {
        return (
            <div className="widget-standard-content">
                <WidgetContentSkeleton/>
            </div>
        )
    }

    return (
        <div className="widget-standard-content">
            {slicedData.map((row, index) => (
                <WidgetStandardRow
                    key={index}
                    label={row.label}
                    additionalInfo={row.additionalInfo}
                    icon={row.icon}
                    link={row.link}
                    isDivider={row.isDivider}
                />
            ))}
            {data.length > 4 &&
                <WidgetFooter
                    disableLeftBtn={disabledButtons.left}
                    disableRightBtn={disabledButtons.right}
                    handleOnClick={updateIndex}
                />
            }
        </div>
    )
}

export default WidgetStandardContent
