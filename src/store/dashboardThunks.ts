import { createAsyncThunk } from "@reduxjs/toolkit";
import ICustomer from "../interfaces/ICustomer";
import NetworkService from "../services/NetworkService";

export const URLtoNotifications = "/api/internal/admin/dashboard/notifications";
const URLToCustomerInfo = "/api/internal/customers/";

export const fetchCustomer = createAsyncThunk(
  "dashboard/fetchCustomer",
  async (): Promise<ICustomer | undefined> => {
    const response: Response = await NetworkService.sendGet(URLToCustomerInfo);

    if (response.ok) {
      return (await response.json()) as ICustomer;
    }
  }
);
