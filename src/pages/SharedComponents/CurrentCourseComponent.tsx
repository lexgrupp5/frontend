import { ReactElement } from "react";
import { CourseDto } from "@/api";
import { CgMoreVerticalO } from "react-icons/cg";
import { useNavigateToPath } from "@/hooks";
import { StudentCoursePath } from "@/constants";
import { H, P, TextColor, UnstyledButton, IconContainer } from "@/components";

interface Props {
    course: CourseDto | null;
}


export function CurrentCourseComponent({ course }: Props): ReactElement {
    const navigate = useNavigateToPath();
    if (course != null) {

        const navigateToStudentCoursePage = () => {
            if (course.id == null) { return; }
            navigate(StudentCoursePath.constructStudentCoursePath(course.id));
        };

        return (
            <article
                className="relative flex flex-col justify-center items-center 
                    h-full w-full
                    bg-indigo-600 p-3
                    rounded border-2 border-black
                    outline-offset-2 hover:outline-3
                    hover:outline hover:outline-indigo-50
                    cursor-pointer overflow-y-auto">
                <UnstyledButton
                    className="absolute top-2 right-2"
                    onPress={navigateToStudentCoursePage}>
                    <IconContainer
                        className="flex items-end justify-start
                            p-2 size-9 text-gray-200
                            rounded-full hover:bg-indigo-950">
                        <CgMoreVerticalO />
                    </IconContainer></UnstyledButton>
                <H size={4}>{course!.name}</H>
                <div>
                    <P color={TextColor.MEDIUM}>Start: {course!.startDate?.toDateString()}</P>
                    <P color={TextColor.MEDIUM}>End: {course!.endDate?.toDateString()}</P>

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