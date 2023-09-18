import { Outlet } from "react-router-dom";

import "./App.css";

export const App = (): JSX.Element => {
  return (
    <>
      <Outlet />
    </>
  );
};
