import { ReactElement } from "react";
import { CourseDto } from "@/api";
import { H, P, TextColor } from "@/components";

interface Props {
    course: CourseDto | null;
}


export function CurrentCourseDetailedComponent({ course }: Props): ReactElement {
    if (course != null) {
        return (
            <article
                className="flex flex-col justify-center items-center 
            h-full w-full
            bg-indigo-600 p-3
            rounded border-2 border-black
            outline-offset-2 hover:outline-3
            hover:outline hover:outline-indigo-50
            cursor-pointer overflow-y-auto">
                <div>
                    <H color={TextColor.MEDIUM}>{course.name}</H>
                    <P color={TextColor.MEDIUM}>Start: {course!.startDate?.toDateString()}</P>
                    <P color={TextColor.MEDIUM}>End: {course!.endDate?.toDateString()}</P>
                    <P color={TextColor.MEDIUM}>{course.description}</P>
                </div>
            </article>
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