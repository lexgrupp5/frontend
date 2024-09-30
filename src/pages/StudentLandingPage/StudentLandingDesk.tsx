import { H, P, TextColor } from "@/components";
import { getAPI } from "@/config";

interface Props{
    username: string;
}

export const StudentLandingDesk = ({username}: Props): React.ReactElement => {

    return (
        <>
            <div className="flex flex-col items-center pt-4">
                <H className="items-center" size={4}>Welcome {username}!</H>
            </div>
        </>
    )
}