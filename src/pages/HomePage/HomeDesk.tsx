import { useAuthContext } from "@/hooks";

export const HomeDesk = (): React.ReactElement => {
  const { isLoggedIn } = useAuthContext();
  
  return (
    <div className="flex flex-col items-center p-2 bg-indigo-600">
      <p className="text-white">Welcome to uour home desk</p>
      <p className="text-white">Logged in: {`${isLoggedIn}`}</p>
    </div>
  );
};
