import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import dashboardSlice from "./dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    dashboard: dashboardSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
