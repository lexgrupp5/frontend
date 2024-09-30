import { FormEventHandler, ReactElement } from "react";

import { ActivityDto } from "@/api";
import { H, SubmitButton, TextColor } from "@/components";
import { DefaultToastMessage } from "../SharedComponents";

interface Props {
  activity: ActivityDto;
}

export const UpdateActivityForm: React.FC<Props> = ({
  activity
}): ReactElement => {

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    handleCloseResult();
    await updateActivity();
  };

  const updateActivity = async () => {
  };

  const handleCloseResult = () => {
  };

  return (
    <form onSubmit={submit}
      className="w-full
      bg-indigo-100
      rounded-lg max-w-lg">
      <DefaultToastMessage onClose={handleCloseResult} />
      <H size={3} color={TextColor.DARK_X} className="mb-2">
        Update activity '{activity.description}''
      </H>
      <SubmitButton>Update Activity</SubmitButton>
    </form>
  );
};