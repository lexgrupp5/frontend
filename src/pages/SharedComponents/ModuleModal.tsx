import { ReactElement } from "react";
import { H, P, TextColor, DarkModal } from "@/components";
import { IActivityDto } from "@/api";

interface Props {
    isOpen: boolean;
    module: IActivityDto;
    onClose: () => void;
}

export const ModuleModal: React.FC<Props> = ({
    isOpen,
    module,
    onClose
}): ReactElement => {

    // ACTIVITY.ID HOLDER IS A PLACEHOLDER, REPLACE WITH ACTIVITY TYPE WHEN IMPLEMENTED
    return (
        <DarkModal
            isOpen={isOpen}
            onClose={onClose}>
            <H size={4}>{module.id}</H>
            <div>
                <P color={TextColor.MEDIUM}>Start: {module.startDate?.toDateString()}</P>
                <P color={TextColor.MEDIUM}>End: {module.endDate?.toDateString()}</P>
                <br />
                <P>{module.description}</P>
            </div>
        </DarkModal>
    );
};