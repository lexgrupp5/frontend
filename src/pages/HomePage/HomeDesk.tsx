import { OkButton } from "@/components";
import { useAuthContext } from "@/hooks";

export const HomeDesk = (): React.ReactElement => {
	const { isLoggedIn, logout } = useAuthContext();
	return (
		<div className=" w-3/4 h-3/4 bg-indigo-400 p-4 hp-4 rounded-lg max-w-lg">
			<p className="text-white my-6 mr-2">Welcome</p>
			<p className="text-white my-6 mr-2">Logged in: {`${isLoggedIn}`}</p>
			<OkButton onPress={() => { logout() }} label={"logout"}/>
		</div>
	);
};
