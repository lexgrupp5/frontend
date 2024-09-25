import { ReactElement } from "react";
import { StudentLandingDesk } from "./StudentLandingDesk";
import { useStudentPageContext } from "@/hooks";
import { useParams } from "react-router-dom";
import { getAPI } from "@/config";
import { Spinner, ErrorModal, P } from "@/components";
import { CurrentCourseComponent, RelevantActivitiesComponent, CurrentModulesComponent } from "../SharedComponents/index.ts";

export const StudentLandingPage = (): ReactElement => {
    const { pending, error, clearError, course, modules, activities } = useStudentPageContext();
    const { username } = useParams();

    if (pending) {
        return <div className="h-[calc(100vh-10rem)]"><Spinner /></div>
    }

    if (error != null) {
        return <ErrorModal isOpen={true}
            onClose={clearError}>
            <P>Error message from {getAPI()}:</P>
            <P>{error.message}</P>
        </ErrorModal>
    }

    if (course == null) {
        return <ErrorModal isOpen={true}
            onClose={clearError}>
            <P>Course was null. Course object:</P>
            <P>{course}</P>
        </ErrorModal>
    }

    //PLACEHOLDER ACTIVIITES, API FETCH TO GET THE CURRENT RELEVANT ACTIVITIES GOES HERE
    // const activities: IActivityDto[] = [
    //     {
    //         id: 1,
    //         description: "Seminar day",
    //         startDate: new Date(2024, 9, 1),
    //         endDate: new Date(2024, 9, 1),
    //     },
    //     {
    //         id: 2,
    //         description: "Group assignment",
    //         startDate: new Date(2024, 9, 2),
    //         endDate: new Date(2024, 9, 7),
    //     },
    //     {
    //         id: 3,
    //         description: "Group review day",
    //         startDate: new Date(2024, 9, 8),
    //         endDate: new Date(2024, 9, 8),
    //     },
    //     {
    //         id: 4,
    //         description: "Final presentation",
    //         startDate: new Date(2024, 9, 9),
    //         endDate: new Date(2024, 9, 9),
    //     }
    // ];

    return (
        <>
            <StudentLandingDesk username={username!} />
            <article
                className="flex m-1">
                <div className="w-4/5 m-1">
                    <CurrentModulesComponent modules={modules} />
                </div>
                <div className="w-1/5 m-1">
                    <CurrentCourseComponent course={course} />
                </div>
            </article>
            <div className="mx-2">
                <RelevantActivitiesComponent activities={activities} />
            </div>
        </>
    )
}