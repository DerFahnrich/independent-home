import NetworkService from "./networkService";

const URL = "/api/internal/invoice";

class InvoiceService {
    getSlimmedUnpaidInvoices = async () => {
        return NetworkService
            .sendGet(URL + '/slimmed-unpaid-with-currency')
            .then(invoices => invoices.json());
    }

    //logs and commented code likely neccessary for further developement
    getInvoicePDF = async (invoiceEntityKey: string | undefined) => {
        return NetworkService
            .sendGet(URL + `/${invoiceEntityKey}/file/pdf`)
            .then((data: Response) => {
                //NetworkService.downloadResult(data.data, data.status, data.headers)
                return data;
            })
            .catch((error) => console.log(error));
    }
}

export default new InvoiceService();
