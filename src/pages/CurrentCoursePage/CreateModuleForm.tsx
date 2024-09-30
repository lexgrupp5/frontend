import { FormEventHandler, ReactElement, useState } from "react";

import { api, ModuleCreateModel } from "@/api";
import { H, Input, LightModal, P, SubmitButton, TextColor } from "@/components";
import { DefaultToastMessage } from "../SharedComponents";
import { useApi, useCoursesPageContext, useMessageContext } from "@/hooks";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  updateCourseCacheTimestamp: () => void;
}

export const CreateModuleForm: React.FC<Props> = ({
  isOpen,
  onClose,
  updateCourseCacheTimestamp
}): ReactElement => {
  const createModule = useApi(api.modules);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const msgContext = useMessageContext();
  const coursesPageContext = useCoursesPageContext();

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    handleCloseResult(); 
    
    const [err, result] = await createModule.makeAuthRequestWithErrorResponse(
      new ModuleCreateModel({
        courseId: coursesPageContext.selectedCourse?.id,
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      })
    );
    
    if (err == null && result != null) {
      msgContext.updateMessage(`Module '${result.name}' have been created`);
    } else {
      msgContext.updateErrorMessage("Module could not be created");
    }
  };

  const handleCloseForm = () => {
    handleCloseResult();
    onClose();
    updateCourseCacheTimestamp();
  };

  const handleCloseResult = () => {
    if (createModule.error != null) {
      createModule.clearError();
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
            Create new module for course: {coursesPageContext.selectedCourse?.name}
          </H>
          <P color={TextColor.DARK} className="mb-6">
            Please add module details below
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
            <SubmitButton>Create</SubmitButton>
          </fieldset>
        </form>
      </div>
    </LightModal>
  );
};
