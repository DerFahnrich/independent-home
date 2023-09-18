import React, {useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";
import {useTranslation} from "react-i18next";

import InvoiceWidgetContent from "@components/dashboard/InvoiceWidget/InvoiceWidgetContent";
import StandardWidget from "@commons/standard-widget/StandardWidget";
import WidgetHeader from "@commons/widget-header/WidgetHeader";
import Row from "@interfaces/IRow";
import IWidgetStandardProps from "@interfaces/IWidgetStandardProps";
import InvoiceService from "@services/invoiceService";

import "./InvoiceWidget.css";

const InvoiceWidget = ({className}: IWidgetStandardProps): JSX.Element => {
    const {t} = useTranslation();
    const [invoices, setInvoices] = useState<Row[]>([]);
    const [loadingInvoices, setLoadingInvoices] = useState(true);
    const subHeader = getUnpaidInvoicesString();

    useEffect(() => {
        InvoiceService
            .getSlimmedUnpaidInvoices()
            .then(invoices => {
                const invoiceRows = invoices.map((invoice: any, index: number) => ({
                    id: index,
                    label: formatToISODate(invoice.standardDueDate),
                    additionalInfo: `${invoice.sum} ${invoice.currency.name}`,
                    class: invoice.isPastDueDate ? "warning" : undefined,
                    entityKey: invoice.key
                }));

                setInvoices(invoiceRows);
                setLoadingInvoices(false);
            })
            .catch(error => {
                    console.log(error);
                }
            );
    }, []);

    function getUnpaidInvoicesString() {
        const length = invoices.length;

        if (loadingInvoices) {
            return <Skeleton width="75%"/>
        }

        if (length === 0) {
            return t("admin_dashboard.invoices_widget.no_invoices_to_pay");
        }

        if (length === 1) {
            return `${length} ${t("admin_dashboard.invoices_widget.unpaid_invoice")}`
        }

        return `${length} ${t("admin_dashboard.invoices_widget.unpaid_invoices")}`
    }

    function formatToISODate (date: string): string{
        return date.substring(0, 10);
    }

    return (
        <StandardWidget className={className}>
            <WidgetHeader
                header={t("massedit.invoiceplaces.invoices")}
                headerLink={"/invoice.jsp"}
                subHeader={subHeader}
            />
         <InvoiceWidgetContent invoices={invoices} loading={loadingInvoices}/>
        </StandardWidget>
    )
}

export default InvoiceWidget;
