import { ReactElement } from "react";
import { useNavigateToPath, useCurrentCourseContext, useStudentPageContext } from "@/hooks"
import { H, P, TextColor } from "@/components";
import { Path } from "@/constants";
import { ModuleDto } from "@/api";

interface Props {
    module: ModuleDto;
    modules: ModuleDto[] | null;
}

export const ModuleItem: React.FC<Props> = ({ module }): ReactElement => {
    const navigate = useNavigateToPath();
    const { updateSelectedCourse, updateSelectedModule, selectedCourse, updateSelectedParticipant } = useCurrentCourseContext();
    const { course } = useStudentPageContext();

    const navigateToModule = () => {
        if (module.id == null) { return; }
        updateSelectedParticipant(null);
        updateSelectedCourse(course!)
        updateSelectedModule(module);
        navigate(Path.constructSelectedCoursePath(`${selectedCourse?.id}`))
    }

    const dateNow = new Date();
    return (
        <>
            <article
                className="relative min-w-[250px] h-[180px] flex-col justify-center items-center p-3
                rounded border-2 hover:outline-3
                hover:outline hover:outline-indigo-50
                cursor-pointer overflow-y-auto"
                onClick={() => { navigateToModule() }}>
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
}