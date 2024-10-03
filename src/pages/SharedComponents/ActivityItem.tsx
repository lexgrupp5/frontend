import { ReactElement } from "react";
import { Path } from "@/constants";
import { P, TextColor } from "@/components";
import { ActivityDto } from "@/api";
import { useStudentPageContext, useCurrentCourseContext, useNavigateToPath } from "@/hooks";

interface Props {
    activity: ActivityDto;
}

export const ActivityItem: React.FC<Props> = ({ activity }): ReactElement => {
    const navigate = useNavigateToPath();
    const { course, module } = useStudentPageContext();
    const dateNow = new Date();
    const { updateSelectedCourse, updateSelectedModule, updateSelectedActivity, selectedCourse } = useCurrentCourseContext();

    const navigateToActivity = () => {
        if (activity.id === null) { return; }
        updateSelectedCourse(course!);
        updateSelectedModule(module)
        updateSelectedActivity(activity);
        navigate(Path.constructSelectedCoursePath(`${selectedCourse?.id}`))
    }

    return (
        <>
            <article
                className="flex h-full min-w-[255px] flex-col justify-between p-3
                    rounded border-2 bg-indigo-600
                    outline-offset-2 hover:outline-3
                    hover:outline hover:outline-indigo-50
                    cursor-pointer overflow-y-auto"
                onClick={() => { navigateToActivity(); }}>
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