import { ReactElement, useState } from "react";

import type { ActivityDto, ModuleDto, ICourseDto } from "@/api";
import { useAuthContext } from "@/hooks";
import { SectionBuilder } from "./SectionBuilder";
import { LightModal } from "@/components";
import { UpdateCourseForm } from "./UpdateCourseForm";

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
  const [editModule, setEditModuöe] = useState(false);
  const [editActivity, setEditActivity] = useState(false);

  const handleClose = async () => {
    setEditCourse(false);
  };

  return (
    <article className="flex flex-col gap-4">
      <section ref={courseArticle.courseSection}>    
        {new SectionBuilder()
          .setTitle(`Course: ${course.name}`, 2)
          .withSubtitle(`${course.startDate?.toDateString()} - ${course.endDate?.toDateString()}`)
          .withDescription(`${course.description}`)
          .setEditable(isTeacher())
          .withEditAction(() => { setEditCourse(true); })
          .withEditComponent(() => (
            <LightModal
              isOpen={editCourse}
              onClose={handleClose}>
              <UpdateCourseForm course={course}/>
            </LightModal>
          ))
          .build()
        }
      </section>
      {module != null && <section ref={courseArticle.moduleSection}>
        {new SectionBuilder()
          .setTitle(`Module: ${module.name}`, 3)
          .withSubtitle(`${module.startDate?.toDateString()} - ${module.endDate?.toDateString()}`)
          .withDescription(`${module.description}`)
          .setEditable(isTeacher())
          .withEditAction(() => { setEditModuöe(true); })
          .withEditComponent(() => (
            <LightModal
              isOpen={editModule}
              onClose={() => { setEditModuöe(false); }}>
            </LightModal>
          ))
          .build()
        }
      </section>
      }
      {activity != null && <section ref={courseArticle.activitySection}>
        {new SectionBuilder()
          .setTitle(`Activity: ${activity.id}`, 3)
          .withSubtitle(`${activity.startDate?.toDateString()} - ${activity.endDate?.toDateString()}`)
          .withDescription(`${activity.description}`)
          .setEditable(isTeacher())
          .withEditAction(() => { setEditActivity(true); })
          .withEditComponent(() => <LightModal
            isOpen={editActivity}
            onClose={() => { setEditActivity(false); }} />)
          .build()
        }
      </section>
      }
    </article>
  );
};
