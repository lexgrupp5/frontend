import { ReactElement } from "react";
import { H, P, TextColor, DarkModal } from "@/components";
import { IActivityDto } from "@/api";

interface Props {
    isOpen: boolean;
    activity: IActivityDto;
    onClose: () => void;
}

export const ActivityModal: React.FC<Props> = ({
    isOpen,
    activity,
    onClose
}): ReactElement => {

    // ACTIVITY.ID HOLDER IS A PLACEHOLDER, REPLACE WITH ACTIVITY TYPE WHEN IMPLEMENTED
    return (
        <DarkModal
            isOpen={isOpen}
            onClose={onClose}>
            <H size={4}>{activity.id}</H>
            <div>
                <P color={TextColor.MEDIUM}>Start: {activity.startDate?.toDateString()}</P>
                <P color={TextColor.MEDIUM}>End: {activity.endDate?.toDateString()}</P>
                <br />
                <P>{activity.description}</P>
            </div>
        </DarkModal>
    );
};