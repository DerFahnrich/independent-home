import React from "react";
import Skeleton from "react-loading-skeleton";

import "./WidgetContentSkeleton.css";

const WidgetContentSkeleton = (): JSX.Element => {
    const getRandomInt = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return (
        <div className="widget-content-skeleton">
            <Skeleton className="skeleton-row" count={getRandomInt(2, 4)}/>
        </div>
    )
}

export default WidgetContentSkeleton;
