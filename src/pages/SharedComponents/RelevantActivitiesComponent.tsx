import { ReactElement } from "react";
import { ActivityDto } from "@/api";
import { ActivityItem } from "./ActivityItem";
import { H, P } from "@/components";

interface Props {
    activities: ActivityDto[] | null;
}

export function RelevantActivitiesComponent({ activities }: Props): ReactElement {
    if (activities != null) {
        return (
            <>
                <article className="flex flex-col items-center max-w-4/5 mx-auto">
                    <H size={4}>The activities of current module:</H>

                    <article className="flex overflow-x-auto space-x-4 p-4 w-full">
                        {activities!.length === 0 && <div className="w-full flex justify-center p-8">
                            <P>No activites were found!</P>
                        </div>}
                        {activities!.length !== 0 &&
                            activities!.map((activity) => (
                                <div key={activity.id}
                                    className={`h-full sm:p-2 sm:w-1/2 lg:w-1/4 rounded shadow-lg}`}>
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