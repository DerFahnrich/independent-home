import { CheckCircle } from "@mui/icons-material";

import WidgetContentSkeleton from "../../../common/widget-content/widget-content-skeleton/WidgetContentSkeleton";
import WidgetFooter from "../../../common/widget-footer/WidgetFooter";
import Row from "../../../interfaces/IRow";
import InvoiceRow from "./InvoiceRow";
import useFooter from "../../../hooks/useFooter";

import "./InvoiceWidgetContent.css";

interface IInvoiceWidgetContentProps {
  invoices: Row[];
  loading: boolean;
}

const InvoiceWidgetContent = (
  props: IInvoiceWidgetContentProps
): JSX.Element => {
  const { disabledButtons, slicedData, updateIndex } = useFooter(
    props.invoices
  );

  if (props.loading) {
    return (
      <div className="widget-standard-content">
        <WidgetContentSkeleton />
      </div>
    );
  }

  if (props.invoices === undefined) {
    return <div className="invoice-widget-content" />;
  }

  if (props.invoices.length === 0) {
    return (
      <div className="invoice-check-icon-container">
        <CheckCircle className="invoice-check-icon" />
      </div>
    );
  }

  const sortedInvoicesByDate: Row[] = slicedData.sort((a: Row, b: Row) => {
    const dateA: number = new Date(a.label as string).getTime();
    const dateB: number = new Date(b.label as string).getTime();
    return dateA - dateB;
  });

  return (
    <div className="invoice-widget-content">
      {sortedInvoicesByDate &&
        sortedInvoicesByDate.map((i: Row, index: number) => (
          <InvoiceRow amount={i.additionalInfo} key={index} date={i.label} />
        ))}
      {props.invoices.length > 4 && (
        <WidgetFooter
          disableLeftBtn={disabledButtons.left}
          disableRightBtn={disabledButtons.right}
          handleOnClick={updateIndex}
        />
      )}
    </div>
  );
};

export default InvoiceWidgetContent;
