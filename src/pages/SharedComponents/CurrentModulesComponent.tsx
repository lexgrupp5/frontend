import { ModuleDto } from "@/apiGenerated";
import { ReactElement } from "react";
import { ModuleItem } from "./ModuleItem";
import { H, P } from "@/components";

interface Props {
    modules: ModuleDto[] | null;
}

export function CurrentModulesComponent({ modules }: Props): ReactElement {
    return (
        <>
            <article className="flex flex-col items-center
                                bg-indigo-600 p-3
                                rounded border-2 border-black
                                outline-offset-2 hover:outline-3
                                hover:outline hover:outline-indigo-50
                                cursor-pointer overflow-y-auto">
                <H size={4} className="relative left-44">Modules of your course</H>
                <div>
                    <article className="flex flex-wrap p-4 max-w-7xl m-auto">
                        {modules!.length === 0 && (
                            <div className="w-full flex justify-center p-8">
                                <P>No modules were found!</P>
                            </div>
                        )}
                        {modules!.length !== 0 &&
                            modules!.map((module) => (
                                <div
                                    key={module.id}
                                    className={`h-full sm:p-2 sm:w-1/2 lg:w-1/3 h-[160px]`}>
                                    <ModuleItem module={module} modules={modules} />
                                </div>
                            ))}
                    </article>
                </div>
            </article>
        </>
    );

    // return (
    //     <>
    //         <article className="flex flex-col
    //                             bg-indigo-600 p-3
    //                             rounded border-2 border-black
    //                             outline-offset-2 hover:outline-3
    //                             hover:outline hover:outline-indigo-50
    //                             cursor-pointer overflow-y-auto">
    //             <H size={4}>Modules of your course</H>
    //             <div>
    //                 <article className="flex flex-wrap p-4 max-w-7xl m-auto">
    //                     {modules!.length === 0 && <div className="w-full flex justify-center p-8">
    //                         <P>No modules were found!</P>
    //                     </div>}
    //                     {modules!.length !== 0 &&
    //                         modules!.map((module) => (
    //                             <div key={module.id}
    //                                 className="h-full sm:p-2 sm:w-1/2 lg:w-1/3 mb-6 h-[160px]">
    //                                 <ModuleItem module={module} />
    //                             </div>
    //                         ))}
    //                 </article>
    //             </div>

    //         </article>
    //     </>
    // );
}