import {Currency} from "@models/currencyModel";

export interface Invoice {
    sum: string;
    standardDueDate: string;
    isPastDueDate: boolean;
    key: string;
    currency: Currency;
}
