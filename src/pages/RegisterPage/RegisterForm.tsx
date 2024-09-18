import { ReactElement } from "react";
import { Input, NavLink, SubmitButton } from "@/components";
import { Path } from "@/constants";

export const RegisterForm = (): ReactElement => {
	return (
		<form action=""
			className=" bg-indigo-100 px-8 pt-4 rounded-lg shadow-lg max-w-lg w-full">
			<h1 className="text-2xl font-bold mb-4">Register</h1>
			<p className="text-gray-600 mb-6">Please enter your registration details below</p>
			<fieldset className="flex flex-col gap-6">
				<Input type="text" label="Username" required/>
				<Input type="password" label="Password" required />
				<SubmitButton label="Submit" />
			</fieldset>
			<div className="flex items-center">
				<p className="text-gray-600 my-6 mr-2">Registered?</p>
				<NavLink to={`/${Path.LOGIN}`} label="Login" />
			</div>
		</form>
	);
};
