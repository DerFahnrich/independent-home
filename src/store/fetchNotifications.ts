import { createAsyncThunk } from "@reduxjs/toolkit";
import { URLtoNotifications } from "./dashboardThunks";

export const fetchNotifications = createAsyncThunk(
  "dashboard/fetchNotifications",
  async () => {
    const response: Response = await NetworkService.sendGet(URLtoNotifications);

    if (response.ok) {
      return (await response.json()) as INotification[];
    }
  }
);
