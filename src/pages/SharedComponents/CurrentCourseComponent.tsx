import { ReactElement } from "react";
import { CourseDto } from "@/api";
import { H, P, TextColor } from "@/components";

interface Props {
    course: CourseDto | null;
}

export function CurrentCourseComponent({ course }: Props): ReactElement {
    console.log(course);
    if (course != null) {
        return (
            <article className="flex flex-col justify-center items-center 
            h-96 w-full
            bg-indigo-600 p-3
            rounded border-2 border-black
            outline-offset-2 hover:outline-3
            hover:outline hover:outline-indigo-50
            cursor-pointer overflow-y-auto">
                <H size={4}>{course!.name}</H>
                <div>
                    <P color={TextColor.MEDIUM}>Start: {course!.startDate?.toDateString()}</P>
                    <P color={TextColor.MEDIUM}>End: {course!.endDate?.toDateString()}</P>

                </div>
                <div className="moduleDiv">
                    <P color={TextColor.MEDIUM}>Current Module:</P>
                    <P color={TextColor.MEDIUM}>MODULE GOES HERE</P>
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