import { ReactElement, useState } from "react";

import type { ActivityDto, ModuleDto, ICourseDto } from "@/api";
import { useAuthContext } from "@/hooks";
import { CourseSectionBuilder } from "./CourseSectionBuilder";
import { UpdateCourseForm } from "./UpdateCourseForm";
import { UpdateModuleForm } from "./UpdateModuleForm";
import { UpdateActivityForm } from "./UpdateActivityForm";

export interface ICourseArticle {
  courseSection: React.RefObject<HTMLDivElement>;
  moduleSection: React.RefObject<HTMLDivElement>;
  activitySection: React.RefObject<HTMLDivElement>;
}

interface Props {
  courseArticle: ICourseArticle;
  course: ICourseDto;
  module: ModuleDto | null;
  activity: ActivityDto | null;
}

export const CourseArticle: React.FC<Props> = ({
  courseArticle,
  course,
  module,
  activity
}): ReactElement => {
  const { isTeacher } = useAuthContext();
  const [editCourse, setEditCourse] = useState(false);
  const [editModule, setEditModule] = useState(false);
  const [editActivity, setEditActivity] = useState(false);

  const CourseSection: React.FC<{ course: ICourseDto }> = ({
    course
  }) => {
    const section = new CourseSectionBuilder()
      .setTitle(`Course: ${course.name}`, 2)
      .withSubtitle(`${course.startDate?.toDateString()} - ${course.endDate?.toDateString()}`)
      .withDescription(`${course.description}`);
  
    if (isTeacher()) {
      section.withEditAction(() => { setEditCourse(true); })
        .withEditComponent(() => (
          <UpdateCourseForm
            isOpen={editCourse}
            onClose={() => { setEditCourse(false); }}
            course={course} />
        ));
    }
    return section.build();
  };

  const ModuleSection: React.FC<{module: ModuleDto}> = ({
    module
  }): ReactElement => {
    const section = new CourseSectionBuilder()
      .setTitle(`Module: ${module.name}`, 2)
      .withSubtitle(`${module.startDate?.toDateString()} - ${module.endDate?.toDateString()}`)
      .withDescription(`${module.description}`);
  
    if (isTeacher()) {
      section.withEditAction(() => { setEditModule(true); })
        .withEditComponent(() => (
          <UpdateModuleForm
            isOpen={editModule}
            onClose={() => { setEditModule(false); }}
            module={module} />
        ));
    }
    return section.build();
  };

  const ActivtySection: React.FC<{activity: ActivityDto}> = ({
    activity
  }): ReactElement => {
    const section = new CourseSectionBuilder()
      .setTitle(`Activity: ${activity.id}`, 2)
      .withSubtitle(`${activity.startDate?.toDateString()} - ${activity.endDate?.toDateString()}`)
      .withDescription(`${activity.description}`);
  
    if (isTeacher()) {
      section.withEditAction(() => { setEditActivity(true); })
        .withEditComponent(() => (
          <UpdateActivityForm
            isOpen={editActivity}
            onClose={() => { setEditActivity(false); }}
            activity={activity} />
        ));
    }
    return section.build();
  };

  return (
    <article className="flex flex-col gap-4">
      <section ref={courseArticle.courseSection}>
        {<CourseSection course={course}/>}
      </section>
      {module != null && <section ref={courseArticle.moduleSection}>
        {<ModuleSection module={module}/>}
      </section>}
      {activity != null && <section ref={courseArticle.activitySection}>
        {<ActivtySection activity={activity}/>}
      </section>}
    </article>
  );
};
