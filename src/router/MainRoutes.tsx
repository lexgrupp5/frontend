import { ReactElement } from "react";
import { Route } from "react-router-dom";

import { AuthGuard, NavigateToPath, TeacherGuard } from "@/components";
import * as Pages from "@/pages";
import { Path } from "@/constants";
import { CoursesPageProvider, StudentPageProvider } from "@/providers";

export const MainRoutes = (): ReactElement => {
  return (
    <>
      <Route element={<AuthGuard><Pages.MainPage /></AuthGuard>}>
        <Route element={<StudentPageProvider />}>
          <Route index element={<Pages.StudentLandingPage />} />
          <Route path=":id" element={<Pages.StudentCoursePage />} />
        </Route>
        <Route path={Path.COURSES} element={<CoursesPageProvider />} >
          <Route index element={<Pages.CoursesPage />} />
          <Route path="new" element={
            <TeacherGuard>
              <Pages.NewCoursePage />
            </TeacherGuard>} />
          <Route path=":id" element={<Pages.CurrentCoursePage />} />
        </Route>
        <Route path={Path.PROFILE} element={<Pages.ProfilePage />} />
        
      </Route>
      <Route path={Path.UNKNOWN} element={<NavigateToPath to={Path.INDEX} />} />
    </>
  );
};
