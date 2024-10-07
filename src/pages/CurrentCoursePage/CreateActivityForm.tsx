import { FormEventHandler, ReactElement, useState } from "react";

import { ActivityCreateDto, api } from "@/api";
import { H, Input, SelectMenu, SubmitButton, TextColor } from "@/components";
import { useApi, useCurrentCourseContext, useMessageContext } from "@/hooks";
import { activityTypes } from "@/constants";

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
  const [type, setType] = useState(activityTypes[0].name);
  const msgContext = useMessageContext();
  const coursesPageContext = useCurrentCourseContext();

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    msgContext.clearMessages();
    
    const [err, result] = await createActivity.makeAuthRequestWithErrorResponse(
      new ActivityCreateDto({
        moduleId: coursesPageContext.selectedModule?.id,
        description,
        activityTypeName: type,
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
    setType("");
  };

  return (
    <form onSubmit={submit}
      className="w-full
      bg-indigo-100
      rounded-lg max-w-lg">
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
        <SelectMenu
          label="Type"
          required
          value={type}
          options={activityTypes.map(type => type.name)}
          onChange={e => { setType(e.target.value); }} />
        <SubmitButton>Create Activity</SubmitButton>
      </fieldset>
    </form>
  );
};
