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