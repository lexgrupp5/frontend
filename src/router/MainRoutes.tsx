import { ReactElement } from "react";
import { Route } from "react-router-dom";

import { AuthGuard, NavigateToPath } from "@/components";
import * as Pages from "@/pages";
import { Path } from "@/constants";

export const MainRoutes = (): ReactElement => {
  return (
    <>
      <Route element={<AuthGuard><Pages.MainPage /></AuthGuard>} path={Path.INDEX}>
        <Route index element={<Pages.HomePage />} />
        <Route path={Path.COURSES} element={<Pages.CoursesPage />} />
        <Route path={Path.CURRENT_COURSE} element={<Pages.CurrentCoursePage />} />
        <Route path={Path.PROFILE} element={<Pages.ProfilePage />} />
      </Route>
      <Route path={Path.UNKNOWN} element={<NavigateToPath to={Path.INDEX} />} />
    </>
  );
};
