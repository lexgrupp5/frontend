import { ReactElement } from "react";
import { FormLayout } from "@/components";
import { LoginForm } from "./LoginForm";

export const LoginPage = (): ReactElement => {
	return (
		<FormLayout>
			<LoginForm />
		</FormLayout>
	);
};
