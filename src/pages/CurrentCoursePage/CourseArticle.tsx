import { ReactElement, useState } from "react";

import type { ActivityDto, ModuleDto, ICourseDto, UserDto } from "@/api";
import { useAuthContext, useCurrentCourseContext } from "@/hooks";
import { CourseSectionBuilder } from "./CourseSectionBuilder";
import { UpdateCourseForm } from "./UpdateCourseForm";
import { UpdateModuleForm } from "./UpdateModuleForm";
import { UpdateActivityForm } from "./UpdateActivityForm";
import { CourseModal } from "./CourseModal";
import { Path } from "@/constants";
import { BreadcrumbItemType, Breadcrumb } from "@/components";

interface Props {
  course: ICourseDto;
  updateCacheTimestamp: () => void;
}

export const CourseArticle: React.FC<Props> = ({
  course,
  updateCacheTimestamp
}): ReactElement => {
  const context = useCurrentCourseContext();
  const { isTeacher } = useAuthContext();
  const [editCourse, setEditCourse] = useState(false);
  const [editModule, setEditModule] = useState(false);
  const [editActivity, setEditActivity] = useState(false);
  const breadcrumbItems: BreadcrumbItemType[] = [
    { label: "Home", path: Path.INDEX },
    { label: "Courses", path: Path.COURSES },
    {
      label: `${context.selectedCourse?.id}`,
      path: Path.constructSelectedCoursePath(`${context.selectedCourse?.id}`)
    },
  ];

  const CourseSection: React.FC<{ course: ICourseDto }> = ({
    course
  }): ReactElement => {
    const section = new CourseSectionBuilder()
      .setTitle(`Course: ${course.name}`, 2)
      .withDescription(`${course.description}`);

    if (course.startDate != null && course.endDate != null) {
      section.withSubtitle(`${course.startDate?.toDateString()} - ${course.endDate?.toDateString()}`);
    }

    if (isTeacher()) {
      section
        .withEditAction(() => { setEditCourse(true); })
        .withEditComponent(
          <CourseModal
            isOpen={editCourse}
            onClose={() => { setEditCourse(false); }}>
            <UpdateCourseForm course={course}
              onSuccess={() => { setEditCourse(false); }} />
          </CourseModal>
        );
    }

    return section.build();
  };

  const ModuleSection: React.FC<{ module: ModuleDto }> = ({
    module
  }): ReactElement => {
    const section = new CourseSectionBuilder()
      .setTitle(`Module: ${module.name}`, 2)
      .withDescription(`${module.description}`);

    if (module.startDate != null && module.endDate != null) {
      section.withSubtitle(`${module.startDate?.toDateString()} - ${module.endDate?.toDateString()}`);
    }

    if (isTeacher()) {
      section
        .withEditAction(() => { setEditModule(true); })
        .withEditComponent(
          <CourseModal
            isOpen={editModule}
            onClose={() => { setEditModule(false); }}>
            <UpdateModuleForm
              module={module}
              onSuccess={() => { setEditModule(false); updateCacheTimestamp(); }} />
          </CourseModal>
        );
    }

    return section.build();
  };

  const ActivtySection: React.FC<{ activity: ActivityDto }> = ({
    activity
  }): ReactElement => {
    const section = new CourseSectionBuilder()
      .setTitle(`Activity: ${activity.activityTypeName}`, 2)
      .withDescription(`${activity.description} - ${activity.activityTypeDescription}`);

    if (activity.startDate != null && activity.endDate != null) {
      section.withSubtitle(`${activity.startDate?.toDateString()} - ${activity.endDate?.toDateString()}`);
    }

    if (isTeacher()) {
      section
        .withEditAction(() => { setEditActivity(true); })
        .withEditComponent(
          <CourseModal
            isOpen={editActivity}
            onClose={() => { setEditActivity(false); }}>
            <UpdateActivityForm
              activity={activity}
              onSuccess={() => { setEditActivity(false); updateCacheTimestamp(); }} />
          </CourseModal>
        );
    }

    return section.build();
  };

  const UserSection: React.FC<{ participant: UserDto }> = ({
    participant
  }): ReactElement => {
    const section = new CourseSectionBuilder()
      .setTitle(`Participant: ${participant.name}`, 2)
      .withSubtitle(`${participant.email}`);

    return section.build();
  };

  return (
    <article className="w-full px-8 flex flex-col gap-4 max-w-7xl">
      <Breadcrumb items={breadcrumbItems} />
      <section>
        {<CourseSection course={course} />}
      </section> 
      {context.selectedParticipant != null
        ?
        <section>
          {<UserSection participant={context.selectedParticipant} />}
        </section>
        : 
        <>
          {context.selectedModule != null && <section>
            {<ModuleSection module={context.selectedModule} />}
          </section>}
          {context.selectedActivity != null && <section>
            {<ActivtySection activity={context.selectedActivity} />}
          </section>}
        </>}
    </article>
  );
};
