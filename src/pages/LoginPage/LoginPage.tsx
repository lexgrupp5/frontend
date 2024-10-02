import { ReactElement } from "react";
import { FormLayout } from "@/components";
import { LoginForm } from "./LoginForm";
import { DefaultToastMessage } from "../SharedComponents";

export const LoginPage = (): ReactElement => {
  return (
    <>
      <DefaultToastMessage headerOffset={false}/>
      <FormLayout>
        <LoginForm />
      </FormLayout>
    </>
  );
};
