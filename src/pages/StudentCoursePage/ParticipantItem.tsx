import { ReactElement, useState } from "react";
import { H, P, TextColor } from "@/components";
import { UserDto } from "@/api";

interface Props {
    participant: UserDto;
}

export const ParticipantItem: React.FC<Props> = ({ participant }): ReactElement => {
    return (
        <>
            <article className="flex h-full flex-col justify-center items-center
                bg-indigo-600 p-3
                rounded border-2 hover:outline-3
                hover:outline hover:outline-indigo-50
                cursor-pointer overflow-y-auto">
                <div>
                    <P color={TextColor.MEDIUM}> {participant.name} </P>
                    <P color={TextColor.MEDIUM}> {participant.email} </P>
                </div>
            </article>
        </>
    )
}