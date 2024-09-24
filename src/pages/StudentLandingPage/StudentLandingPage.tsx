import { StudentLandingDesk } from "./StudentLandingDesk";
import { useParams } from "react-router-dom";
import { IActivityDto, ICourseDto, IModuleDto } from "@/api";
import { CurrentCourseComponent, RelevantActivitiesComponent, CurrentModulesComponent } from "../SharedComponents/index.ts";

export const StudentLandingPage = (): React.ReactElement => {
    const { username } = useParams();

    //PLACEHOLDER COURSE, API FETCH TO GET COURSE BASED ON USERNAME GOES HERE
    const course: ICourseDto = {
        name: "Placeholder course",
        startDate: new Date(2024, 9, 24),
        endDate: new Date(2024, 12, 24),
    };

    //PLACEHOLDER ACTIVIITES, API FETCH TO GET THE CURRENT RELEVANT ACTIVITIES GOES HERE
    const activities: IActivityDto[] = [
        {
            id: 1,
            description: "Seminar day",
            startDate: new Date(2024, 9, 1),
            endDate: new Date(2024, 9, 1),
        },
        {
            id: 2,
            description: "Group assignment",
            startDate: new Date(2024, 9, 2),
            endDate: new Date(2024, 9, 7),
        },
        {
            id: 3,
            description: "Group review day",
            startDate: new Date(2024, 9, 8),
            endDate: new Date(2024, 9, 8),
        },
        {
            id: 4,
            description: "Final presentation",
            startDate: new Date(2024, 9, 9),
            endDate: new Date(2024, 9, 9),
        }
    ];

    //PLACEHOLDER MODULES, API FETCH TO GET THE MODULES OF THE CURRENT COURSE GOES HERE
    const modules: IModuleDto[] = [
        {
            id: 1,
            name: "Introduction to Programming",
            description: "This module introduces the basics of programming and computational thinking.",
            startDate: new Date(2024, 9, 1),
            endDate: new Date(2024, 11, 15),
            activities: [],
        },
        {
            id: 2,
            name: "Advanced Data Structures",
            description: "A deep dive into complex data structures and algorithms.",
            startDate: new Date(2024, 9, 17),
            endDate: new Date(2025, 0, 31),
            activities: [],
        },
        {
            id: 3,
            name: "Web Development",
            description: "Learn how to build modern web applications using the latest frameworks.",
            startDate: new Date(2025, 1, 1),
            endDate: new Date(2025, 1, 10),
            activities: [],
        }
    ];

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