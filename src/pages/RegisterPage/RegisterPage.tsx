import { ReactElement } from "react";
import { FormLayout } from "@/components";
import { RegisterForm } from "./RegisterForm";

export const RegisterPage = (): ReactElement => {
  return (
    <FormLayout>
      <RegisterForm />
    </FormLayout>
  );
};
