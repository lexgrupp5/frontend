import { ReactElement, useState } from "react";

import { H, P, TextColor } from "@/components";
import { IActivityDto } from "@/api";
import { ActivityModal } from "./ActivityModal";

interface Props {
    activity: IActivityDto;
}

export const ActivityItem: React.FC<Props> = ({ activity }): ReactElement => {
    const [viewActivity, setViewActivity] = useState(false);

    return (
        <>
            {viewActivity && <ActivityModal isOpen={viewActivity}
                activity={activity}
                onClose={() => { setViewActivity(false); }} />}
            <article
                className="flex h-full flex-col justify-between
        bg-indigo-600 p-3
        rounded border-2 border-black
        outline-offset-2 hover:outline-3
        hover:outline hover:outline-indigo-50
        cursor-pointer overflow-y-auto"
                onClick={() => { setViewActivity(true); }}>
                <H size={4}>{activity.description}</H>
                <div className="w-full flex justify-between items-end">
                    <div>
                        <P color={TextColor.MEDIUM}>Start: {activity.startDate?.toDateString()}</P>
                        <P color={TextColor.MEDIUM}>End: {activity.endDate?.toDateString()}</P>
                    </div>
                </div>
            </article>
        </>
    );
};