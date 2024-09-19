import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Path } from "@/constants";
import * as Pages from "@/pages";
import { AuthGuard, NavigateToPath } from "@/components";

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthGuard><Pages.MainPage/></AuthGuard>} path={Path.INDEX}>
        <Route index element={<Pages.HomePage />} />
      </Route>
      <Route path={Path.LOGIN} element={<Pages.LoginPage />} />
      <Route path={Path.REGISTER} element={<Pages.RegisterPage />} />
      <Route path={Path.UNKNOWN} element={<NavigateToPath to={Path.INDEX} />} />
    </>
  )
);
