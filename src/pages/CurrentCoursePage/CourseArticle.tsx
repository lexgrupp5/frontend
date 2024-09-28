import { ReactElement, useState } from "react";

import type { ActivityDto, ModuleDto, ICourseDto } from "@/api";
import { useAuthContext } from "@/hooks";
import { SectionBuilder } from "./SectionBuilder";
import { DarkModal } from "@/components";

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

  return (
    <article className="flex flex-col gap-4">
      <section ref={courseArticle.courseSection}>    
        {new SectionBuilder()
          .setTitle(`Course: ${course.name}`)
          .setHeaderSize(2)
          .setSubtitle(`${course.startDate?.toDateString()} - ${course.endDate?.toDateString()}`)
          .setEditable(isTeacher())
          .withEditAction(() => { setEditCourse(true); })
          .withEditComponent(() => (
            <DarkModal
              isOpen={editCourse}
              fixedSize={true}
              onClose={() => { setEditCourse(false); }}>
            </DarkModal>
          ))
          .withDescription(`${course.description}`)
          .build()
        }
      </section>
      {module != null && <section ref={courseArticle.moduleSection}>
        {new SectionBuilder()
          .setTitle(`Module: ${module.name}`)
          .setHeaderSize(3)
          .setSubtitle(`${module.startDate?.toDateString()} - ${module.endDate?.toDateString()}`)
          .setEditable(isTeacher())
          .withEditAction(() => { setEditModuöe(true); })
          .withEditComponent(() => (
            <DarkModal
              isOpen={editModule}
              fixedSize={true}
              onClose={() => { setEditModuöe(false); }}>
            </DarkModal>
          ))
          .withDescription(`${module.description}`)
          .build()
        }
      </section>
      }
      {activity != null && <section ref={courseArticle.activitySection}>
        {new SectionBuilder()
          .setTitle(`Activity: ${activity.id}`)
          .setHeaderSize(3)
          .setSubtitle(`${activity.startDate?.toDateString()} - ${activity.endDate?.toDateString()}`)
          .setEditable(isTeacher())
          .withEditAction(() => { setEditActivity(true); })
          .withEditComponent(() => <DarkModal
            isOpen={editActivity}
            fixedSize={true}
            onClose={() => { setEditActivity(false); }} />)
          .withDescription(`${activity.description}`)
          .build()
        }
      </section>
      }
    </article>
  );
};
