import { FormEventHandler, ReactElement, useState } from "react";

import { Input, SubmitButton, NavLink, NavigateToPath } from "@/components";
import { Path } from "@/constants";
import { useAuthContext, useNavigateToPath } from "@/hooks";
import { getDefaultPwd, getDefaultUsername } from "@/utils";

export const LoginForm = (): ReactElement => {
  const [username, setUsername] = useState(getDefaultUsername());
  const [password, setPassword] = useState(getDefaultPwd());
  const { isLoggedIn, login } = useAuthContext();
  const navigate = useNavigateToPath();

  if (isLoggedIn) {
    return <NavigateToPath to={Path.INDEX} replace />;
  }

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await login(username, password);
    navigate(Path.INDEX);
  };

  return (
    <form onSubmit={submit}
      className=" w-full pt-4 px-8 
      bg-indigo-100
      rounded-lg shadow-lg max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <p className="text-gray-600 mb-6">
        Please enter your login details below
      </p>
      <fieldset className="flex flex-col gap-6">
        <Input
          type="text"
          label="Username"
          required
          value={username}
          onChange={e => { setUsername(e.target.value); }}/>
        <Input
          type="password"
          label="Password"
          required
          value={password}
          onChange={e => { setPassword(e.target.value); }}/>
        <SubmitButton>Login</SubmitButton>
      </fieldset>
      <div className="flex items-center">
        <p className="text-gray-600 my-6 mr-2">No account?</p>
        <NavLink to={Path.REGISTER}
          className="text-indigo-600 hover:underline">
          Register
        </NavLink>
      </div>
    </form>
  );
};
