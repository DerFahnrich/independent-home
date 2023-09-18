import useFooter from "../../hooks/useFooter";
import Row from "../../interfaces/IRow";
import WidgetFooter from "../widget-footer/WidgetFooter";
import WidgetContentSkeleton from "./widget-content-skeleton/WidgetContentSkeleton";
import WidgetStandardRow from "./widget-rows/WidgetStandardRow";

interface IWidgetStandardContentProps {
  data: Row[];
  loading: boolean;
}

const WidgetStandardContent = ({
  data,
  loading,
}: IWidgetStandardContentProps): JSX.Element => {
  const { disabledButtons, slicedData, updateIndex } = useFooter(data);

  if (loading) {
    return (
      <div className="widget-standard-content">
        <WidgetContentSkeleton />
      </div>
    );
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

export default WidgetStandardContent;
