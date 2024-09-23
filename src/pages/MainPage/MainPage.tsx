import { MainLayout } from "@/components/Layouts/MainLayout";
import { Outlet } from "react-router-dom";
import { NavigationHeader } from "./NavigationHeader";

export const MainPage = (): React.ReactElement => {
  return (
    <MainLayout>
      <NavigationHeader />
      <Outlet />
    </MainLayout>
  );
};
