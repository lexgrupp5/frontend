import { FormEventHandler, ReactElement, useState } from "react";

import { Input, SubmitButton, NavLink, NavigateToPath, H, P, TextColor, SecretInput } from "@/components";
import { Path } from "@/constants";
import { useAuthContext, useNavigateToPath } from "@/hooks";
import { getDefaultPwd, getDefaultUsername } from "@/services";

export const RegisterForm = (): ReactElement => {
  const [username, setUsername] = useState(getDefaultUsername());
  const [password, setPassword] = useState(getDefaultPwd());
  const { isLoggedIn, register } = useAuthContext();
  const navigate = useNavigateToPath();

  if (isLoggedIn) {
    return <NavigateToPath to={Path.INDEX} replace />;
  }

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await register(username, password);
    navigate(Path.LOGIN);
  };

  return (
    <form onSubmit={submit}
      className=" w-full pt-4 px-8 
      bg-indigo-100
      rounded-lg shadow-lg max-w-lg">
      <H size={1} color={TextColor.DARK_X} className="mb-2">Register</H>
      <P color={TextColor.DARK} className="mb-6">
        Please enter your registration details below
      </P>
      <fieldset className="flex flex-col gap-6">
        <Input
          type="text"
          label="Username"
          required
          value={username}
          onChange={e => { setUsername(e.target.value); }}/>
        <SecretInput
          label="Password"
          required
          value={password}
          onChange={e => { setPassword(e.target.value); }}/>
        <SubmitButton>Register</SubmitButton>
      </fieldset>
      <div className="flex items-center">
        <P color={TextColor.DARK} className= "my-6 mr-2">Registered?</P>  
        <NavLink to={Path.LOGIN}
          className="text-indigo-600 hover:underline">
          Login
        </NavLink>
      </div>
    </form>
  );
};
