import { ReactElement, useState } from "react";

import { P, TextColor } from "@/components";
import { IActivityDto } from "@/api";
import { ActivityModal } from "./ActivityModal";

interface Props {
    activity: IActivityDto;
}

export const ActivityItem: React.FC<Props> = ({ activity }): ReactElement => {
    const [viewActivity, setViewActivity] = useState(false);
    const dateNow = new Date();

    return (
        <>
            {viewActivity && <ActivityModal isOpen={viewActivity}
                activity={activity}
                onClose={() => { setViewActivity(false); }} />}
            <article
                className="flex h-full min-w-[255px] flex-col justify-between p-3
                    rounded border-2 bg-indigo-600
                    outline-offset-2 hover:outline-3
                    hover:outline hover:outline-indigo-50
                    cursor-pointer overflow-y-auto"
                onClick={() => { setViewActivity(true); }}>
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