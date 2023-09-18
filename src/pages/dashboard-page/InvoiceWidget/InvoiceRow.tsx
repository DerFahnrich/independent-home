import "./InvoiceRow.css";

interface IInvoiceRowProps {
    amount?: string;
    entityKey?: string;
    date?: string;
}

const InvoiceRow = (props: IInvoiceRowProps): JSX.Element => {
    const classes: string[] = ["invoice-row"]
    const invoiceIsDue: boolean =
        new Date(props.date!).toLocaleDateString() < new Date(Date.now()).toLocaleDateString();

    if (invoiceIsDue) {
        classes.push("is-due");
    }

    return (
        <div className={classes.join(" ")}>
            <span className="invoice-label">{props.date}</span>
            <span className="invoice-additional-info">{props.amount}</span>
        </div>
    )
}

export default InvoiceRow;
