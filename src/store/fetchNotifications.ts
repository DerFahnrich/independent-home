import { createAsyncThunk } from "@reduxjs/toolkit";
import { URLtoNotifications } from "./dashboardThunks";

import NetworkService from "../services/NetworkService";
import INotification from "../interfaces/INotification";

export const fetchNotifications = createAsyncThunk(
  "dashboard/fetchNotifications",
  async () => {
    const response: Response = await NetworkService.sendGet(URLtoNotifications);

    if (response.ok) {
      return (await response.json()) as INotification[];
    }
  }
);
