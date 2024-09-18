import { ReactElement, useEffect } from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	useNavigate
} from "react-router-dom";

import { Path } from "@/constants";
import * as Pages from "@/pages";

export const appRouter = createBrowserRouter(
	createRoutesFromElements(MainRoutes())
);

function MainRoutes (): ReactElement {
	return (
		<Route path={Path.INDEX}>
			<Route index element={<Pages.LoginPage />} />
			<Route path={Path.LOGIN} element={<Pages.LoginPage />} />
			<Route path={Path.REGISTER} element={<Pages.RegisterPage />} />
			<Route path={Path.UNKNOWN} element={<RouteToIndex />} />
		</Route>
	);
}

function RouteToIndex (): ReactElement {
	const navigate = useNavigate();
	useEffect(() => { navigate(Path.LOGIN); });
	return <></>;
}