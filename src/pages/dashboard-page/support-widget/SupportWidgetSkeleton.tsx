import Skeleton from "react-loading-skeleton";

import WidgetDivider from "../../../common/widget-content/widget-divider/WidgetDivider";
import "./SupportWidgetSkeleton.css";

const SupportWidgetSkeleton = (): JSX.Element => {
  return (
    <div className="support-widget-skeleton">
      <div className="logo-skeleton">
        <Skeleton circle={true} height="72px" width="72px" />
      </div>
      <div className="info-skeleton">
        <Skeleton count={3} />
        <WidgetDivider />
        <Skeleton />
      </div>
    </div>
  );
};

export default SupportWidgetSkeleton;
