import { ReactElement } from "react";
import { Route } from "react-router-dom";

import { AuthGuard, NavigateToPath } from "@/components";
import * as Pages from "@/pages";
import { Path } from "@/constants";
import { CoursesPageProvider, StudentPageProvider } from "@/providers";

export const MainRoutes = (): ReactElement => {
  return (
    <>
      <Route element={<AuthGuard><Pages.MainPage /></AuthGuard>}>
        <Route index element={<Pages.HomePage />} />
        <Route path={Path.COURSES} element={<CoursesPageProvider />} >
          <Route index element={<Pages.CoursesPage />} />
          <Route path="new" element={<Pages.NewCoursePage />} />
          <Route path=":id" element={<Pages.CurrentCoursePage />} />
        </Route>
        <Route path={Path.PROFILE} element={<Pages.ProfilePage />} />
        <Route path={Path.STUDENTHOME} element={<StudentPageProvider />}>
          <Route path=":username" element={<Pages.StudentLandingPage />} />
        </Route>
        <Route path={Path.STUDENTCOURSE} element={<StudentPageProvider />}>
          <Route path=":id" element={<Pages.StudentCoursePage />} />
        </Route>
      </Route>
      <Route path={Path.UNKNOWN} element={<NavigateToPath to={Path.INDEX} />} />
    </>
  );
};
