import { ReactElement, useEffect } from "react";
import { StudentLandingDesk } from "./StudentLandingDesk";
import { useApi, useAuthContext, useMessageContext, useStudentPageContext } from "@/hooks";
import { FullPageSpinner } from "@/components";
import { CurrentCourseComponent, RelevantActivitiesComponent, CurrentModulesComponent, DefaultToastMessage } from "../SharedComponents/index.ts";
import { ActivityDto, api, ModuleDto } from "@/api/index.ts";

export const StudentLandingPage = (): ReactElement => {
  const context = useStudentPageContext();
  const authContext = useAuthContext();
  const getCourse = useApi(api.userGET);
  const courseParticipants = useApi(api.courses);
  const getModules = useApi(api.modulesAll);
  const getModuleActivities = useApi(api.activities);
  const messageContext = useMessageContext();

  useEffect(() => {
    (async () => {
      const username = authContext.getUsername();
      if (username == null) { return; }
      const [courseErr, courseResult]  = await getCourse.makeAuthRequestWithErrorResponse(username);
      context.updateCourse(courseResult);
      if (courseErr != null) { messageContext.updateErrorMessage(courseErr?.message); }
      if (courseResult?.id == null) { return; }
      const [modulesErr, modulesResult] = await getModules.makeAuthRequestWithErrorResponse(courseResult.id);
      if (modulesErr != null) { messageContext.updateErrorMessage(modulesErr?.message); }
      if (modulesResult == null) { return; }
      context.updateModules(modulesResult);
      updateModuleActivities(modulesResult);
    })();
  },[]);

  const updateModuleActivities = async (courseModules: ModuleDto[]) => {
    const activities: ActivityDto[] = [];
    for (const module of courseModules) {
      if (module.id == null) { continue; }
      const [err, result] = await getModuleActivities.makeAuthRequestWithErrorResponse(module.id);
      if (err != null) { 
        messageContext.updateErrorMessage(err?.message);
        continue;
      }
      if (result != null) {
        activities.push(...result); 
      }
    };
    context.updateActivities(activities);
  };

  if (getCourse.pending || getModules.pending || getModuleActivities.pending) {
    return  <FullPageSpinner />;
  }

  return (
    <>
      <DefaultToastMessage />
      <StudentLandingDesk username={authContext.getUsername()!} />
      <article
        className="flex m-1">
        {context.modules != null && <div className="w-4/5 m-1">
          <CurrentModulesComponent modules={context.modules} />
        </div>}
        {context.course != null && <div className="w-1/5 m-1">
          <CurrentCourseComponent course={context.course} />
        </div>}
      </article>
      {context.activities != null && <div className="mx-2">
        <RelevantActivitiesComponent activities={context.activities} />
      </div>}
    </>
  );
};