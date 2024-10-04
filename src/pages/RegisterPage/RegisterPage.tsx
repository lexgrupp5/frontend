import { ReactElement } from "react";
import { FormLayout } from "@/components";
import { RegisterForm } from "./RegisterForm";
import { DefaultToastMessage } from "../SharedComponents";

export const RegisterPage = (): ReactElement => {
  return (
    <>
      <DefaultToastMessage headerOffset={false} />
      <FormLayout>
        <RegisterForm />
      </FormLayout></>
  );
};
