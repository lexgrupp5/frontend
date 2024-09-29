import { FormEventHandler, ReactElement, useState } from "react";

import { api, ModuleDto } from "@/api";
import { H, Input, LightModal, P, SubmitButton, TextColor } from "@/components";
import { DefaultToastMessage } from "../SharedComponents";
import { createPatchOperations, formatDateToString } from "@/utils";
import { useApi, useCoursesPageContext, useMessageContext } from "@/hooks";

interface Props {
  module: ModuleDto;
  isOpen: boolean;
  onClose: () => void;
  updateSelectedModule: (module: ModuleDto | null) => void
  updateCourseCacheTimestamp: () => void;
}

export const UpdateModuleForm: React.FC<Props> = ({
  module,
  isOpen,
  onClose,
  updateSelectedModule,
  updateCourseCacheTimestamp
}): ReactElement => {
  const patchModule = useApi(api.module);
  const [name, setName] = useState(module.name ?? "");
  const [description, setDescription] = useState(module.description ?? "");
  const [startDate, setStartDate] = useState(formatDateToString(module.startDate) ?? "");
  const [endDate, setEndDate] = useState(formatDateToString(module.endDate) ?? "");
  const msgContext = useMessageContext();

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    handleCloseResult();
    if (module.id == null) { return; }

    const [err] = await patchModule.makeAuthRequestWithErrorResponse(
      module.id,
      createPatchOperations<ModuleDto>([
        { key: "name", value: name },
        { key: "description", value: description },
        { key: "startDate", value: startDate },
        { key: "endDate", value: endDate },
      ]));
    if (err == null) {
      updateModuleData();
      msgContext.updateMessage(`Module '${name}' have been updated`);
    } else {
      msgContext.updateErrorMessage("Module could not be updated");
    }
  };

  const updateModuleData = () => {
    updateSelectedModule(new ModuleDto({
      id: module.id,
      name,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    }));
  };

  const handleCloseForm = () => {
    handleCloseResult();
    onClose();
    updateCourseCacheTimestamp();
  };

  const handleCloseResult = () => {
    if (patchModule.error != null) {
      patchModule.clearError();
    }
  };

  return (
    <LightModal
      isOpen={isOpen}
      onClose={handleCloseForm}>
      <div className="w-full h-full">
        <form onSubmit={submit}
          className="w-full
          bg-indigo-100
          rounded-lg max-w-lg">
          <DefaultToastMessage onClose={handleCloseResult} />
          <H size={2} color={TextColor.DARK_X} className="mb-2">
            {module.name}
          </H>
          <H size={4} color={TextColor.DARK_X} className="mb-2">
            {module.description}
          </H>
          <P color={TextColor.DARK} className="mb-6">
            Please update module details below
          </P>
          <fieldset className="flex flex-col gap-6">
            <Input
              type="text"
              label="Name"
              required
              value={name}
              onChange={e => { setName(e.target.value); }} />
            <Input
              label="Description"
              type="text"
              required
              value={description}
              onChange={e => { setDescription(e.target.value); }} />
            <Input
              label="Start date"
              type="date"
              required
              value={startDate}
              onChange={e => { setStartDate(e.target.value); }} />
            <Input
              label="End date"
              type="date"
              required
              value={endDate}
              onChange={e => { setEndDate(e.target.value); }} />
            <SubmitButton>Update</SubmitButton>
          </fieldset>
        </form>
      </div>
    </LightModal>
  );
};