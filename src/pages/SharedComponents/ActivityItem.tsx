import { ReactElement } from "react";

import { P, TextColor } from "@/components";
import { ActivityDto } from "@/api";
import { useCurrentCourseContext, useNavigateToPath, useCourseContext } from "@/hooks";
import { Path } from "@/constants";

interface Props {
    activity: ActivityDto;
}

export const ActivityItem: React.FC<Props> = ({ activity }): ReactElement => {
  const dateNow = new Date();
  const currentCourseContext = useCurrentCourseContext();
  const courseContext = useCourseContext();
  const navigate = useNavigateToPath();

  const handleSelectActivity = () => {
    if (courseContext.course?.id == null) { return; }    
    currentCourseContext.updateSelectedActivity(activity);
    currentCourseContext.updateSelectedCourse(courseContext.course);
    currentCourseContext.updateSelectedModule(courseContext.modules.find(module =>
      module.id === activity.moduleId
    ) ?? null);
    navigate(Path.constructSelectedCoursePath(courseContext.course?.id));
  };

  return (
    <>
      <article
        className="flex h-full min-w-[255px] flex-col justify-between p-3
                    rounded border-2 bg-indigo-600
                    outline-offset-2 hover:outline-3
                    hover:outline hover:outline-indigo-50
                    cursor-pointer overflow-y-auto"
        onClick={handleSelectActivity}>
        <div className="w-full flex justify-between items-end">
          <div>
            {dateNow < activity.startDate! ? (
              <div className="flex flex-col m-4">
                <div className="flex">
                  <P color={TextColor.MEDIUM}>{activity.activityTypeName}</P>
                  <P color={TextColor.MEDIUM}>&nbsp;-&nbsp;UPCOMING</P>
                </div>
                <P color={TextColor.MEDIUM} className="p-0"><br />Starts: {activity.startDate!.toDateString()}</P>
              </div>
            ) : (<></>)}
            {dateNow > activity.endDate! ? (
              <div className="flex flex-col m-4">
                <div className="flex">
                  <P color={TextColor.MEDIUM}>{activity.activityTypeName}</P>
                  <p className="text-green-500">&nbsp;-&nbsp;COMPLETE ✔</p>
                </div>
                <P color={TextColor.MEDIUM} className="p-0"><br />Finished: {activity.endDate!.toDateString()}</P>
              </div>
            ) : (<></>)}
            {dateNow > activity.startDate! && dateNow < activity.endDate! ? (
              <div className="flex flex-col m-4">
                <div className="flex">
                  <P color={TextColor.MEDIUM}>{activity.activityTypeName}</P>
                  <p className="text-orange-400">&nbsp;-&nbsp;ONGOING</p>
                </div>
                <P color={TextColor.MEDIUM} className="p-0"><br />Deadline: {activity.endDate!.toDateString()}</P>
              </div>
            ) : (<></>)}
          </div>
        </div>
      </article>
    </>
  );
};