import { ReactElement } from "react";
import { Route } from "react-router-dom";

import { AuthGuard, NavigateToPath, TeacherGuard } from "@/components";
import { Path } from "@/constants";
import { CoursesPageProvider, CurrentCourseProvider, StudentPageProvider } from "@/providers";
import { CoursesPage, CurrentCoursePage, MainPage, NewCoursePage, ProfilePage, StudentLandingPage } from "@/pages";

export const MainRoutes: React.FC = (): ReactElement => {
  return (
    <>
      <Route element={<AuthGuard><CurrentCourseProvider><MainPage /></CurrentCourseProvider></AuthGuard>}>
        <Route element={<StudentPageProvider />}>
          <Route index element={<StudentLandingPage />} />
        </Route>
        <Route path={Path.COURSES} element={<CoursesPageProvider />} >
          <Route index element={<TeacherGuard><CoursesPage /></TeacherGuard>} />
          <Route path="new" element={<TeacherGuard><NewCoursePage /></TeacherGuard>} />
          <Route path=":id" element={<CurrentCoursePage />} />
        </Route>
        <Route path={Path.PROFILE} element={<ProfilePage />} />
      </Route>
      <Route path={Path.UNKNOWN} element={<NavigateToPath to={Path.INDEX} />} />
    </>
  );
};
