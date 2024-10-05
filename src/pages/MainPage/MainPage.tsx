import { Outlet } from "react-router-dom";

import { NavigationHeader } from "./NavigationHeader";
import { MainLayout } from "./MainLayout";
import { DefaultToastMessage } from "../SharedComponents";

export const MainPage = (): React.ReactElement => {
  return (
    <MainLayout>
      <DefaultToastMessage />
      <NavigationHeader />
      <Outlet />
    </MainLayout>
  );
};
