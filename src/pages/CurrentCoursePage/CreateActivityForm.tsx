import { FormEventHandler, ReactElement, useState } from "react";

import { ActivityCreateDto, api } from "@/api";
import { H, Input, SubmitButton, TextColor } from "@/components";
import { DefaultToastMessage } from "../SharedComponents";
import { useApi, useCurrentCourseContext, useMessageContext } from "@/hooks";

interface Props {
  title?: string
}

export const CreateActivityForm: React.FC<Props> = ({
  title
}): ReactElement => {
  const createActivity = useApi(api.activitiesPOST);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const msgContext = useMessageContext();
  const coursesPageContext = useCurrentCourseContext();

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    createActivity.clearError(); 
    
    const [err, result] = await createActivity.makeAuthRequestWithErrorResponse(
      new ActivityCreateDto({
        moduleId: coursesPageContext.selectedModule?.id,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      })
    );
    
    if (err == null && result != null) {
      msgContext.updateMessage(`Activity '${result.description}' have been created`);
      clearInputs();
    } else {
      msgContext.updateErrorMessage("Activity could not be created");
    }
  };

  const clearInputs = () => {
    setDescription("");
    setStartDate("");
    setEndDate("");
  };

  const handleCloseForm = () => {
    createActivity.clearError();
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
        <SubmitButton>Create Activity</SubmitButton>
      </fieldset>
    </form>
  );
};
