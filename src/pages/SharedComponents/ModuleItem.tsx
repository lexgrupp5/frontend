import { ReactElement } from "react";
import { H, P, TextColor } from "@/components";
import { ModuleDto } from "@/api";
import { Path } from "@/constants";
import { useCurrentCourseContext, useNavigateToPath, useCourseContext } from "@/hooks";

interface Props {
    module: ModuleDto;
    modules: ModuleDto[] | null;
}

export const ModuleItem: React.FC<Props> = ({ module }): ReactElement => {
  const currentCourseContext = useCurrentCourseContext();
  const courseContext = useCourseContext();
  const navigate = useNavigateToPath();
  const dateNow = new Date();
  
  const handleSelectModule = () => {
    if (courseContext.course?.id == null) { return; }
    currentCourseContext.updateSelectedCourse(courseContext.course);
    currentCourseContext.updateSelectedModule(module);
    currentCourseContext.updateSelectedActivity(null);
    navigate(Path.constructSelectedCoursePath(courseContext.course?.id));
  };
  
  return (
    <>
      <article
        className="relative h-[180px] flex-col justify-center items-center p-3
                rounded border-2 hover:outline-3
                hover:outline hover:outline-indigo-50
                cursor-pointer overflow-y-auto"
        onClick={handleSelectModule}>
        <H size={4}>{module.name}</H>
        <div className="static flex flex-col max-[150px] justify-between items-center items-end">
          <P color={TextColor.MEDIUM}>{module.description}</P>
          {dateNow < module.startDate! ? (
            <div className="flex mt-4">
              <p className="text-gray-200 absolute top-2 right-4">UPCOMING</p>
              <P color={TextColor.MEDIUM}><br />Module starts: {module.startDate?.toDateString()}</P>
            </div>
          ) : (<></>)}
          {dateNow > module.endDate! ? (
            <div className="flex mt-4">
              <p className="text-green-500 absolute top-2 right-4">COMPLETE ✔</p>
              <P color={TextColor.MEDIUM}><br />Module finished: {module.endDate?.toDateString()}</P>
            </div>
          ) : (<></>)}
          {dateNow > module.startDate! && dateNow < module.endDate! ? (
            <div className="flex mt-4">
              <p className="text-orange-400 absolute top-2 right-4">ONGOING</p>
              <P color={TextColor.MEDIUM}><br />Module starts: {module.startDate?.toDateString()}</P>
            </div>
          ) : (<></>)}
        </div>
      </article>
    </>
  );
};
