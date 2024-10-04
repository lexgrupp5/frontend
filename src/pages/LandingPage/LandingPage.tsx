import { ReactElement, useEffect } from "react";
import { StudentLandingDesk } from "./StudentLandingDesk.tsx";
import { useAuthContext, useCourseContext } from "@/hooks";
import { FullPageSpinner } from "@/components";
import { CurrentCourseComponent, RelevantActivitiesComponent, CurrentModulesComponent, DefaultToastMessage } from "../SharedComponents/index.ts";

export const LandingPage = (): ReactElement => {
  const courseContext = useCourseContext();
  const authContext = useAuthContext();

  useEffect(() => {
    (async () => {
      await courseContext.fetchCourseData();
    })();
  }, []);

  if (courseContext.isPending()) {
    return  <FullPageSpinner />;
  }

  return (
    <>
      {<DefaultToastMessage />}
      <StudentLandingDesk username={authContext.getUsername()!} />
      <article
        className="flex m-1">
        {courseContext.modules != null && <div className="w-4/5 m-1">
          <CurrentModulesComponent modules={courseContext.modules} />
        </div>}
        {courseContext.course != null && <div className="w-1/5 m-1">
          <CurrentCourseComponent course={courseContext.course} />
        </div>}
      </article>
      {courseContext.activities != null && <div className="mx-2">
        <RelevantActivitiesComponent activities={courseContext.activities} />
      </div>}
    </>
  );
};