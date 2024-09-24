import { ReactElement } from "react";
import { Route } from "react-router-dom";

import { AuthGuard, NavigateToPath } from "@/components";
import * as Pages from "@/pages";
import { Path } from "@/constants";
import { CoursesPageProvider } from "@/providers";

export const MainRoutes = (): ReactElement => {
  return (
    <>
      <Route element={<AuthGuard><Pages.MainPage /></AuthGuard>}>
        <Route index element={<Pages.HomePage />} />
        <Route path={Path.COURSES} element={<CoursesPageProvider />} >
          <Route index element={<Pages.CoursesPage />} />
          <Route path=":id" element={<Pages.SelectedCoursePage />} />
        </Route>
        <Route path={Path.CURRENT_COURSE} element={<Pages.CurrentCoursePage />} />
        <Route path={Path.PROFILE} element={<Pages.ProfilePage />} />
        <Route path={`${Path.STUDENTHOME}/:username`} element={<Pages.StudentLandingPage />}>

        </Route>
      </Route>
      <Route path={Path.UNKNOWN} element={<NavigateToPath to={Path.INDEX} />} />
    </>
  );
};
