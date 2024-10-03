import { useEffect, useState, ReactElement } from "react";
import { Outlet } from "react-router-dom";

import { api, ModuleDto } from "@/api";
import { IStudentPageContext } from "@/contexts";
import { useApi } from "@/hooks/useApi";

export const StudentPageProvider = (): ReactElement => {
    const { pending: coursePending, error: courseError, data: courseData, makeAuthRequest: fetchCourseData, clearError: clearCourseError } = useApi(api.getCourse);
    const { pending: modulesPending, error: modulesError, data: modulesData, makeAuthRequest: fetchModulesData, clearError: clearModulesError } = useApi(api.modulesAll);
    const { pending: activityPending, error: activityError, data: activityData, makeAuthRequest: fetchActivityData, clearError: clearActivityError } = useApi(api.activities);
    const { pending: participantsPending, error: participantsError, data: participantsData, makeAuthRequest: fetchParticipantData, clearError: clearParticipantError } = useApi(api.course);
    //STARTS OFF AS -1, GETS ASSIGNED AFTER MODULES HAVE BEEN FETCHED FROM API OR IS LEFT -1 IF NO MODULES WERE FOUND
    const [moduleId, setModuleId] = useState<number | null>(-1)
    const [module, setModule] = useState<ModuleDto | null>(null)

    //PLACEHOLDER ID, SHOULD BE FETCHED FROM THE LOGGED IN USERS REGISTERED COURSE
    //const courseId = User.CourseId
    const courseId = 3;

    const setCurrentModule = async (modules: ModuleDto[]) => {
        const dateNow = new Date();

        if (!modules || modules.length === 0) {
            setModuleId(-1);
            setModule(null);
            return -1;
        }

        if (dateNow > new Date(modules[modules.length - 1].endDate!)) {
            setModuleId(modules[modules.length - 1].id!);
            setModule(modules[modules.length - 1])
            return modules[modules.length - 1].id!;
        }

        if (dateNow < new Date(modules[0].startDate!)) {
            setModuleId(modules[0].id!);
            setModule(modules[0])
            return modules[0].id!;
        }

        const activeModule = modules.find(
            (module) => dateNow >= new Date(module.startDate!) && dateNow <= new Date(module.endDate!)
        );

        const activeModuleId = activeModule?.id! ?? -1;
        setModule(activeModule ?? null);
        setModuleId(activeModuleId);
        return activeModuleId;
    }


    useEffect(() => {
        (async () => {
            try {
                await fetchCourseData(courseId);
                const fetchedModules = await fetchModulesData(courseId);
                let newModuleId = moduleId;
                if (moduleId === -1) {
                    newModuleId = await setCurrentModule(fetchedModules!)
                }
                if (newModuleId !== -1) {
                    await fetchActivityData(newModuleId!);
                    await fetchParticipantData(courseId);
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, [moduleId]);

    const constructStudentPageContext = (): IStudentPageContext => ({
        course: courseData,
        modules: modulesData,
        module: module,
        activities: activityData,
        participants: participantsData,
        pending: coursePending || modulesPending || activityPending || participantsPending,
        error: courseError || modulesError || activityError || participantsError,
        clearError: () => {
            clearCourseError();
            clearModulesError();
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