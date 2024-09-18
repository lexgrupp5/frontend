import { MainLayout } from "@/components/Layouts/MainLayout";
import { Outlet } from "react-router-dom";

export const MainPage = (): React.ReactElement => {
	return (
		<MainLayout>
			<Outlet />
		</MainLayout>
	);
};
