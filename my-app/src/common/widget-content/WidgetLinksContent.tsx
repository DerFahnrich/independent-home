import useFooter from "../../hooks/useFooter";
import Row from "../../interfaces/IRow";
import WidgetFooter from "../widget-footer/WidgetFooter";
import WidgetContentSkeleton from "./widget-content-skeleton/WidgetContentSkeleton";
import WidgetLinkRow from "./widget-rows/WidgetLinkRow";
import "./WidgetLinksContent.css";

interface IWidgetLinksContent {
  data: Row[];
  loading: boolean;
}

const WidgetLinksContent = ({
  data,
  loading,
}: IWidgetLinksContent): JSX.Element => {
  const { disabledButtons, slicedData, updateIndex } = useFooter(data);

  if (loading) {
    return (
      <div className="widget-standard-content">
        <WidgetContentSkeleton />
      </div>
    );
  }

  return (
    <div className="widget-links-content">
      {slicedData.map((row, index) => (
        <WidgetLinkRow
          icon={row.icon}
          label={row.label}
          link={row.link}
          key={index}
        />
      ))}
      {data.length > 4 && (
        <WidgetFooter
          disableLeftBtn={disabledButtons.left}
          disableRightBtn={disabledButtons.right}
          handleOnClick={updateIndex}
        />
      )}
    </div>
  );
};

export default WidgetLinksContent;
