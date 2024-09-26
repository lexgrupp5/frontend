import { ReactElement } from "react";
import { useStudentPageContext } from "@/hooks";
import { H } from "@/components";
import { CurrentCourseDetailedComponent } from "../SharedComponents/index.ts"
import { ParticipantList } from "./ParticipantList.tsx";

export const StudentCoursePage = (): ReactElement => {
    const { course } = useStudentPageContext();


    return (
        <>
            <article
                className="flex flex-col justify-center items-center 
                            h-full w-80%">
                <H size={4}> Other participants of your course:</H>
                <div
                    className="flex flex-col">
                    <CurrentCourseDetailedComponent course={course} />
                    <ParticipantList />
                </div>
            </article>

        </>
    )
}