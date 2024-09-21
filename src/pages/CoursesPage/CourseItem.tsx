import { ReactElement, useState } from "react";

import { H, P, TextColor, DarkModal } from "@/components";
import { CourseDto } from "@/api";

interface Props {
  course: CourseDto;
}

export const CourseItem: React.FC<Props> = ({ course }): ReactElement => {
  const [viewDescrition, setViewDescription] = useState(false);

  return (
    <>
      {viewDescrition && <DarkModal
        isOpen={viewDescrition}
        onClose={() => { setViewDescription(false); }}>
        <H size={4}>{course.name}</H>
        <div>
          <P color={TextColor.MEDIUM}> Start: {course.startDate?.toDateString()}</P>
          <P color={TextColor.MEDIUM}>End: {course.endDate?.toDateString()}</P>
          <br/>
          <P>{course.description}</P>
        </div>
      </DarkModal>}
      <article
        className="flex h-full flex-col justify-between
        bg-indigo-600 p-4
        rounded border-2 border-black shadow-md 
        hover:outline-3 
        hover:outline
        hover:outline-offset-2 
        hover:outline-indigo-50
        cursor-pointer overflow-y-auto
        object-top"
        onClick={() => {
          setViewDescription((prev) => !prev);
        }}>
        <H size={4}>{course.name}</H>
        <div>
          <P color={TextColor.MEDIUM}>
            Start: {course.startDate?.toDateString()}
          </P>
          <P color={TextColor.MEDIUM}>End: {course.endDate?.toDateString()}</P>
        </div>
      </article>
    </>
  );
};
