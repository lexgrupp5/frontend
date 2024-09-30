import { useEffect, ReactElement } from "react";
import { Outlet } from "react-router-dom";

import { api } from "@/api";
import { IStudentPageContext } from "@/contexts";
import { useApi } from "@/hooks/useApi";

export const StudentPageProvider = (): ReactElement => {
    //PLACEHOLDER ID, SHOULD BE FETCHED FROM THE LOGGED IN USERS REGISTERED COURSE
    const courseId = 3;
    const { pending: coursePending, error: courseError, data: courseData, makeAuthRequest: fetchCourseData, clearError: clearCourseError } = useApi(api.getCourse);
    const { pending: modulePending, error: moduleError, data: moduleData, makeAuthRequest: fetchModuleData, clearError: clearModuleError } = useApi(api.modulesAll);
    const { pending: activityPending, error: activityError, data: activityData, makeAuthRequest: fetchActivityData, clearError: clearActivityError } = useApi(api.activities);
    const { pending: participantsPending, error: participantsError, data: participantsData, makeAuthRequest: fetchParticipantData, clearError: clearParticipantError } = useApi(api.course);
    //PLACEHOLDER ID, SHOULD BE FETCHED FROM THE CURRENT RELEVANT MODULE
    const moduleId = 7;

    useEffect(() => {
        (async () => {
            try {
                await fetchCourseData(courseId);
                await fetchModuleData(courseId);
                await fetchActivityData(moduleId!);
                await fetchParticipantData(courseId);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    const constructStudentPageContext = (): IStudentPageContext => ({
        course: courseData,
        modules: moduleData,
        activities: activityData,
        participants: participantsData,
        pending: coursePending || modulePending || activityPending || participantsPending,
        error: courseError || moduleError || activityError || participantsError,
        clearError: () => {
            clearCourseError();
            clearModuleError();
            clearActivityError();
            clearParticipantError();
        }
    });

    return (
        <>
            <Outlet context={constructStudentPageContext()} />
        </>
    );
}