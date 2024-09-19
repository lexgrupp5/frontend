import { ReactElement } from "react";
import { Route } from "react-router-dom";

import * as Pages from "@/pages";
import { Path } from "@/constants";

export const AuthRoutes = (): ReactElement => {
  return (
    <>
      <Route path={Path.LOGIN} element={<Pages.LoginPage />} />
      <Route path={Path.REGISTER} element={<Pages.RegisterPage />} />
    </>
  );
};
