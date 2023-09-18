import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { App } from "./App";
import { Login } from "./Login";

export const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route path="login" element={<Login />} />
      <Route path="dashboard" />
    </Route>,
  ])
);
