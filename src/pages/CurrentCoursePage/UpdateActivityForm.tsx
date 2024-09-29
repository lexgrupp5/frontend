import { FormEventHandler, ReactElement } from "react";

import { ActivityDto } from "@/api";
import { H, LightModal, P, SubmitButton, TextColor } from "@/components";
import { DefaultToastMessage } from "../SharedComponents";

interface Props {
  activity: ActivityDto;
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateActivityForm: React.FC<Props> = ({
  activity,
  isOpen,
  onClose
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
    <LightModal
      isOpen={isOpen}
      onClose={onClose}>
      <div className="w-full h-full">
        <form onSubmit={submit}
          className="w-full
          bg-indigo-100
          rounded-lg max-w-lg">
          <DefaultToastMessage onClose={handleCloseResult} />
          <H size={3} color={TextColor.DARK_X} className="mb-2">
            Activity: {activity.description}
          </H>
          <P color={TextColor.DARK} className="mb-6">
            Please update activity details below
          </P>
          <SubmitButton>Update</SubmitButton>
        </form>
      </div>
    </LightModal>
  );
};