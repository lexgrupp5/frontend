import { P, TextColor } from "@/components";
import { getAPI } from "@/config";
import { useAuthContext } from "@/hooks";

export const HomeDesk = (): React.ReactElement => {
  const { isLoggedIn } = useAuthContext();
  
  return (
    <div className="flex flex-col items-center">
      <P >Welcome to your home desk</P>
      <P color={TextColor.MEDIUM}>Logged in: {`${isLoggedIn}`}</P>
      <P color={TextColor.MEDIUM}>Using api: {`${getAPI()}`}</P>
    </div>
  );
};
