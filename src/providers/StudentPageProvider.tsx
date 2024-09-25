import { useEffect, ReactElement } from "react";
import { Outlet } from "react-router-dom";

import { api } from "@/api";
import { IStudentPageContext } from "@/contexts";
import { useApi } from "@/hooks/useApi";

export const StudentPageProvider = (): ReactElement => {
    //PLACEHOLDER ID, SHOULD BE FETCHED FROM THE LOGGED IN USERS REGISTERED COURSE
    const courseId = 3;
    const { pending: coursePending, error: courseError, data: courseData, fetchAuthData: fetchCourseData, clearError: clearCourseError } = useApi(api.getCourse);
    const { pending: modulePending, error: moduleError, data: moduleData, fetchAuthData: fetchModuleData, clearError: clearModuleError } = useApi(api.modulesOfCourse);


    useEffect(() => {
        (async () => {
            try {
                await fetchCourseData(courseId);
                await fetchModuleData(courseId);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    const constructStudentPageContext = (): IStudentPageContext => ({
        course: courseData,
        modules: moduleData,
        pending: coursePending || modulePending,
        error: courseError || moduleError,
        clearError: () => {
            clearCourseError();
            clearModuleError();
        }
    });

    return (
        <>
            <Outlet context={constructStudentPageContext()} />
        </>
    );
}