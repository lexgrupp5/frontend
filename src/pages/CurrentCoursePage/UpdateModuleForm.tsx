import { FormEventHandler, ReactElement } from "react";

import {ModuleDto } from "@/api";
import { LightModal } from "@/components";

interface Props {
  module: ModuleDto;
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateModuleForm: React.FC<Props> = ({
  module,
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