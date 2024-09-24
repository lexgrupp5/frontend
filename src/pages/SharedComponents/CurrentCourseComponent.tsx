import { ReactElement } from "react";
import { ICourseDto } from "@/api";
import { H, P, TextColor } from "@/components";

interface Props {
    course: ICourseDto;
}

export function CurrentCourseComponent({ course }: Props): ReactElement {
    return (
        <article className="flex flex-col justify-center items-center 
        h-96 w-full
        bg-indigo-600 p-3
        rounded border-2 border-black
        outline-offset-2 hover:outline-3
        hover:outline hover:outline-indigo-50
        cursor-pointer overflow-y-auto">
            <H size={4}>{course.name}</H>
            <div>
                <P color={TextColor.MEDIUM}>Start: {course.startDate?.toDateString()}</P>
                <P color={TextColor.MEDIUM}>End: {course.endDate?.toDateString()}</P>

            </div>
            <div className="moduleDiv">
                <P color={TextColor.MEDIUM}>Current Module:</P>
                <P color={TextColor.MEDIUM}>MODULE GOES HERE</P>
            </div>

        </article>
    )
}