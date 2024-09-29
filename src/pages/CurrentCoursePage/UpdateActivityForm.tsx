import { FormEventHandler, ReactElement } from "react";

import { ActivityDto } from "@/api";
import { LightModal } from "@/components";

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

        </form>
      </div>
    </LightModal>
  );
};