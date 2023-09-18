export default interface ICustomer {
    companyAddress: ICompanyAddress;
    retailer: IRetailer
}

interface ICompanyAddress {
    city: string;
    companyname: string;
    country: string;
    email: string;
    firstnamwe: string;
    lastname: string;
    postalcode: string;
    street: string;
}

interface IRetailer {
    key: string;
    name: string;
    retailerType: string;
    retailerUrl: string;
    supportEmail: string;
    supportTelephone: ISupportTelephone
}

interface ISupportTelephone {
    nationalFormat: string;
    number: string;
    type: string;
}
