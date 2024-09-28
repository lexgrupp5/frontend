import { ReactElement } from "react";

import { H, P, TextColor } from "@/components";
import type { ActivityDto, ModuleDto, ICourseDto } from "@/api";

export interface ICourseArticle {
  courseSection: React.RefObject<HTMLDivElement>;
  moduleSection: React.RefObject<HTMLDivElement>;
  activitySection: React.RefObject<HTMLDivElement>;
}

interface Props {
  courseArticle: ICourseArticle;
  selectedCourse: ICourseDto;
  selectedModule: ModuleDto | null;
  selectedActivity: ActivityDto | null;
}

export const CourseArticle: React.FC<Props> = ({
  courseArticle,
  selectedCourse,
  selectedModule,
  selectedActivity
}): ReactElement => {
  return (
    <article>
      <section ref={courseArticle.courseSection}>
        <H size={2} color={TextColor.DARK_X}>Course: '{selectedCourse.name}'</H>
        <div>
          <P color={TextColor.DARK}>
            {selectedCourse.startDate?.toDateString()}{" - "}
            {selectedCourse.endDate?.toDateString()}</P>
          <br />
          <P color={TextColor.DARK}>{selectedCourse.description}</P>
        </div>
      </section>
      {selectedModule != null &&
        <section ref={courseArticle.moduleSection} className="pt-4">
          <H size={3} color={TextColor.DARK}>Module: {selectedModule.name}</H>
          <P color={TextColor.DARK}>
            {selectedModule.startDate?.toDateString()}{" - "}
            {selectedModule.endDate?.toDateString()}
          </P>
          <br />
          <P color={TextColor.DARK}>{selectedModule.description}</P>
        </section>
      }
      {selectedActivity != null &&
        <section ref={courseArticle.activitySection} className="pt-4">
          <H size={3} color={TextColor.DARK}>Activity {selectedActivity.id}</H>
          <P color={TextColor.DARK}>
            {selectedActivity.startDate?.toDateString()}{" - "}
            {selectedActivity.endDate?.toDateString()}
          </P>
          <br />
          <P color={TextColor.DARK}>{selectedActivity.description}</P>
        </section>
      }
    </article>
  );
};
