import { useState } from "react";
import { Outlet } from "react-router-dom";

export const App = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div>
      <Outlet />
    </div>
  );
};
