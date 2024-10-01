import { FormEventHandler, ReactElement, useState } from "react";

import { api, ModuleCreateModel } from "@/api";
import { H, Input, SubmitButton, TextColor } from "@/components";
import { DefaultToastMessage } from "../SharedComponents";
import { useApi, useCurrentCourseContext, useMessageContext } from "@/hooks";

interface Props {
  title?: string
  hasModules: (hasModules: boolean) => void;
}

export const CreateModuleForm: React.FC<Props> = ({
  title,
  hasModules
}): ReactElement => {
  const createModule = useApi(api.modules);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const msgContext = useMessageContext();
  const coursesPageContext = useCurrentCourseContext();

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    createModule.clearError(); 
    
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
      clearInputs();
      hasModules(true);
    } else {
      msgContext.updateErrorMessage("Module could not be created");
    }
  };

  const clearInputs = () => {
    setName("");  
    setDescription("");
    setStartDate("");
    setEndDate("");
  };

  const handleCloseForm = () => {
    createModule.clearError();
  };

  return (
    <form onSubmit={submit}
      className="w-full
      bg-indigo-100
      rounded-lg max-w-lg">
      <DefaultToastMessage onClose={handleCloseForm} />
      <H size={3} color={TextColor.DARK_X} className="mb-2">
        {title}
      </H>
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
        <SubmitButton>Create Module</SubmitButton>
      </fieldset>
    </form>
  );
};
