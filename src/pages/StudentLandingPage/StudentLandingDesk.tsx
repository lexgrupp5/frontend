import { H, P, TextColor } from "@/components";
import { getAPI } from "@/config";

interface Props{
    username: string;
}

export const StudentLandingDesk = ({username}: Props): React.ReactElement => {

    return (
        <>
            <div className="flex flex-col items-center">
                <H className="items-center" size={4}>Hello {username}!</H>
                <P>This is your landing page</P>
                <P color={TextColor.MEDIUM}>Currently using API: {`${getAPI()}`}</P>
            </div>
        </>
    )
}