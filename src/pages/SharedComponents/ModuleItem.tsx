import { ReactElement, useState } from "react";

import { H, P, TextColor } from "@/components";
import { IModuleDto } from "@/api";
import { ModuleModal } from "./ModuleModal";

interface Props {
    module: IModuleDto;
}

export const ModuleItem: React.FC<Props> = ({ module }): ReactElement => {
    const [viewModule, setViewModule] = useState(false);

    return (
        <>
            {viewModule && <ModuleModal isOpen={viewModule}
                module={module}
                onClose={() => { setViewModule(false); }} />}
            <article
                className="flex h-full flex-col justify-center items-center
                bg-indigo-600 p-3
                rounded border-2 hover:outline-3
                hover:outline hover:outline-indigo-50
                cursor-pointer overflow-y-auto"
                onClick={() => { setViewModule(true); }}>
                <H size={4}>{module.name}</H>
                <div className="flex flex-col justify-between items-center items-end">
                    <P color={TextColor.MEDIUM}>{module.description}</P>
                    <P color={TextColor.MEDIUM}>Module starts: {module.startDate?.toDateString()}</P>
                    <P color={TextColor.MEDIUM}>Module ends: {module.endDate?.toDateString()}</P>
                    <P color={TextColor.MEDIUM}>Activities in module: {module.activities?.toString()}</P>
                </div>
            </article>
        </>
    )
}