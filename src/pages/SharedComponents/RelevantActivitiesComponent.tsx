import { ReactElement } from "react";
import { ActivityDto } from "@/api";
import { ActivityItem } from "./ActivityItem";
import { H, P } from "@/components";

interface Props {
    activities: ActivityDto[] | null;
}

export function RelevantActivitiesComponent({ activities }: Props): ReactElement {
    console.log(activities);
    if (activities != null) {
        return (
            <>
                <article className="flex flex-col items-center max-w-4/5 mx-auto">
                    <H size={4}>Your activities for this week</H>

                    <article className="flex overflow-x-auto space-x-4 p-4 w-full">
                        {activities!.length === 0 && <div className="w-full flex justify-center p-8">
                            <P>No activites were found!</P>
                        </div>}
                        {activities!.length !== 0 &&
                            activities!.map((activity) => (
                                <div key={activity.id}
                                    className="flex-shrink-0 w-[250px] sm:[300px] lg:w-[350px] mb-6 h-[160px] rounded shadow-lg">
                                    <ActivityItem activity={activity} />
                                </div>
                            ))}
                    </article>
                </article>
            </>
        )
    }
    else {
        return (
            <>
                <H size={4}>No course was found registered on you</H>
            </>
        )
    }
}