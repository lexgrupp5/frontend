import { Outlet } from "react-router-dom";

import { NavigationHeader } from "./NavigationHeader";
import { MainLayout } from "./MainLayout";

export const MainPage = (): React.ReactElement => {
  return (
    <MainLayout>
      <NavigationHeader />
      <Outlet />
    </MainLayout>
  );
};
