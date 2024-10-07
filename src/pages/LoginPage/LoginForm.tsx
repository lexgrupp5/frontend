import { FormEventHandler, ReactElement, useState } from "react";

import { Input, SubmitButton, NavLink, NavigateToPath, H, TextColor, P, SecretInput } from "@/components";
import { Path } from "@/constants";
import { useAuthContext, useMessageContext, useNavigateToPath } from "@/hooks";
import { getDefaultPwd, getDefaultUsername } from "@/config";

export const LoginForm = (): ReactElement => {
  const [username, setUsername] = useState(getDefaultUsername());
  const [password, setPassword] = useState(getDefaultPwd());
  const { isLoggedIn, login } = useAuthContext();
  const navigate = useNavigateToPath();
  const msgContext = useMessageContext();

  if (isLoggedIn) {
    return <NavigateToPath to={Path.INDEX} replace />;
  }

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await login(username, password);
    if (res == null) {
      msgContext.updateErrorMessage("Invalid login, please try again with updated credentials");
      return;
    }

    navigate(Path.INDEX);
  };

  return (
    <form onSubmit={submit}
      className=" w-full pt-4 px-8 
      bg-indigo-100
      rounded-lg shadow-lg max-w-lg">
      <H size={1} color={TextColor.DARK_X} className="mb-2">Login</H>
      <P color={TextColor.DARK} className="mb-6">
        Please enter your login details below
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
        <SubmitButton>Login</SubmitButton>
      </fieldset>
      <div className="flex items-center">
        <P color={TextColor.DARK} className= "my-6 mr-2">No account?</P>
        <NavLink to={Path.REGISTER}
          className="text-indigo-600 hover:underline">
          Register
        </NavLink>
      </div>
    </form>
  );
};
