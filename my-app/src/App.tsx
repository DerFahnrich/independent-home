import { Outlet } from "react-router-dom";

export const App = (): JSX.Element => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
