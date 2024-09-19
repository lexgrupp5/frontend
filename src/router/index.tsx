import {
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";

import { MainRoutes } from "./MainRoutes";
import { AuthRoutes } from "./AuthRoutes";

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      {MainRoutes()}
      {AuthRoutes()}
    </>
  )
);
