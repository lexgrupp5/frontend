import { ReactElement, useState } from "react";

import type { ActivityDto, ModuleDto, ICourseDto } from "@/api";
import { useAuthContext, useCoursesPageContext } from "@/hooks";
import { CourseSectionBuilder } from "./CourseSectionBuilder";
import { UpdateCourseForm } from "./UpdateCourseForm";
import { UpdateModuleForm } from "./UpdateModuleForm";
import { UpdateActivityForm } from "./UpdateActivityForm";
import { CourseModal } from "./CourseModal";

interface Props {
  course: ICourseDto;
  updateCacheTimestamp: () => void;
}

export const CourseArticle: React.FC<Props> = ({
  course,
  updateCacheTimestamp
}): ReactElement => {
  const context = useCoursesPageContext();
  const { isTeacher } = useAuthContext();
  const [editCourse, setEditCourse] = useState(false);
  const [editModule, setEditModule] = useState(false);
  const [editActivity, setEditActivity] = useState(false);

  const CourseSection: React.FC<{ course: ICourseDto }> = ({
    course
  }): ReactElement => {
    const section = new CourseSectionBuilder()
      .setTitle(`Course: ${course.name}`, 2)
      .withSubtitle(`${course.startDate?.toDateString()} - ${course.endDate?.toDateString()}`)
      .withDescription(`${course.description}`);
  
    if (isTeacher()) {
      section
        .withEditAction(() => { setEditCourse(true); })
        .withEditComponent(
          <CourseModal
            isOpen={editCourse}
            onClose={() => { setEditCourse(false); }}>
            <UpdateCourseForm course={course} />
          </CourseModal>
        );
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
      section
        .withEditAction(() => { setEditModule(true); })
        .withEditComponent(
          <CourseModal
            isOpen={editModule}
            onClose={() => { setEditModule(false); updateCacheTimestamp(); }}>
            <UpdateModuleForm module={module} />
          </CourseModal>
        );
    }

    return section.build();
  };

  const ActivtySection: React.FC<{activity: ActivityDto}> = ({
    activity
  }): ReactElement => {
    const section = new CourseSectionBuilder()
      .setTitle(`Activity: ${activity.description}`, 2)
      .withSubtitle(`${activity.startDate?.toDateString()} - ${activity.endDate?.toDateString()}`)
      .withDescription(`${activity.description}`);
  
    if (isTeacher()) {
      section
        .withEditAction(() => { setEditActivity(true); })
        .withEditComponent(
          <CourseModal
            isOpen={editActivity}
            onClose={() => { setEditActivity(false); updateCacheTimestamp(); }}>
            <UpdateActivityForm activity={activity} />
          </CourseModal>
        );
    }

    return section.build();
  };

  return (  
    <article className="flex flex-col gap-4 max-w-7xl">
      <section>
        {<CourseSection course={course}/>}
      </section>
      {context.selectedModule != null && <section>
        {<ModuleSection module={context.selectedModule}/>}
      </section>}
      {context.selectedActivity != null && <section>
        {<ActivtySection activity={context.selectedActivity}/>}
      </section>}
    </article>
  );
};
