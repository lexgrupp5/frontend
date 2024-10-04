import { useEffect, useState, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "@/hooks";
import { api, IModuleDto, CourseDto } from "@/api";
import { IStudentPageContext } from "@/contexts";
import { useApi } from "@/hooks/useApi";

export const StudentPageProvider = (): ReactElement => {
    const { pending: coursePending, error: courseError, data: courseData, makeAuthRequest: fetchCourseData, clearError: clearCourseError } = useApi(api.getCourse);
    const { pending: modulePending, error: moduleError, data: moduleData, makeAuthRequest: fetchModuleData, clearError: clearModuleError } = useApi(api.modulesAll);
    const { pending: activityPending, error: activityError, data: activityData, makeAuthRequest: fetchActivityData, clearError: clearActivityError } = useApi(api.activities);
    const { pending: participantsPending, error: participantsError, data: participantsData, makeAuthRequest: fetchParticipantData, clearError: clearParticipantError } = useApi(api.course);
    //STARTS OFF AS -1, GETS ASSIGNED AFTER MODULES HAVE BEEN FETCHED FROM API OR IS LEFT -1 IF NO MODULES WERE FOUND
    const [moduleId, setModuleId] = useState<number | null>(-1);
    // const [courseId, setCourseId] = useState<number | null>(-1);

    const courseId = 3;
    const { myCourse } = useAuthContext();
    console.log(myCourse);
    // setCourseId(myCourse!.id!);
    // console.log(courseId)

    const setCurrentModule = async (modules: IModuleDto[]) => {
        const dateNow = new Date();

        if (!modules || modules.length === 0) {
            setModuleId(-1);
            return -1;
        }

        if (dateNow > new Date(modules[modules.length - 1].endDate!)) {
            setModuleId(modules[modules.length - 1].id!);
            return modules[modules.length - 1].id!;
        }

        if (dateNow < new Date(modules[0].startDate!)) {
            setModuleId(modules[0].id!);
            return modules[0].id!;
        }

        const activeModule = modules.find(
            (module) => dateNow >= new Date(module.startDate!) && dateNow <= new Date(module.endDate!)
        );

        const activeModuleId = activeModule?.id! ?? -1;
        setModuleId(activeModuleId);
        return activeModuleId;
    }

    // const setCurrentCourse = async (courses: CourseDto[]) => {
    //     console.log("setting course ID function running")
    //     const course = courses[0];
    //     console.log(courses);
    //     console.log(course);
    //     setCourseId(course.id!);
    //     console.log(courseId);
    //     console.log("setting course ID has finished running")
    //     return course.id!
    // }

    useEffect(() => {
        if (!courseId) return;

        (async () => {
            try {
                await fetchCourseData(courseId);
                const fetchedModules = await fetchModuleData(courseId!);
                let newModuleId = moduleId;
                if (moduleId === 0) {
                    newModuleId = await setCurrentModule(fetchedModules!)
                }
                if (newModuleId !== -1) {
                    await fetchActivityData(newModuleId!);
                    await fetchParticipantData(courseId!);
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, [moduleId]);

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