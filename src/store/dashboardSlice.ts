import { createSlice } from "@reduxjs/toolkit";
import { fetchCustomer } from "./dashboardThunks";
import { fetchNotifications } from "./fetchNotifications";
import { RootState } from "./store";
import INotification from "../interfaces/INotification";
import IDashboardSlice from "../interfaces/IDashboardSlice";

const initialState: IDashboardSlice = {
  notifications: [] as INotification[],
  notificationsIsLoading: false,
  showNotifications: false,
  customer: null,
  customerIsLoading: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleNotificationsIsLoading: (state) => {
      state.notificationsIsLoading = !state.notificationsIsLoading;
    },
    toggleShowNotifications: (state) => {
      state.showNotifications = !state.showNotifications;
    },
    toggleCustomerIsLoading: (state) => {
      state.customerIsLoading = !state.customerIsLoading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => {
      state.notificationsIsLoading = true;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      if (action.payload !== undefined) state.notifications = action.payload;
      state.notificationsIsLoading = false;
    });
    builder.addCase(fetchCustomer.pending, (state) => {
      state.customerIsLoading = true;
    });

    builder.addCase(fetchCustomer.fulfilled, (state, action) => {
      if (action.payload !== undefined) state.customer = action.payload;
      state.customerIsLoading = false;
    });
  },
});

export const {
  toggleNotificationsIsLoading,
  toggleShowNotifications,
  toggleCustomerIsLoading,
} = dashboardSlice.actions;

export const selectNotifications = (state: RootState) =>
  state.dashboard.notifications;
export const selectNotificationsIsLoading = (state: RootState) =>
  state.dashboard.notificationsIsLoading;
export const selectShowNotifications = (state: RootState) =>
  state.dashboard.showNotifications;
export const selectCustomer = (state: RootState) => state.dashboard.customer;
export const selectCustomerIsLoading = (state: RootState) =>
  state.dashboard.customerIsLoading;

export default dashboardSlice.reducer;
