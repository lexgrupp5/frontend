import { FormEventHandler, ReactElement, useState } from "react";

import { ActivityDto, api } from "@/api";
import { H, Input, SelectMenu, SubmitButton, TextColor } from "@/components";
import { useApi, useCurrentCourseContext, useMessageContext } from "@/hooks";
import { createPatchOperations, formatDateToString } from "@/utils";
import { activityTypes } from "@/constants";

interface Props {
  activity: ActivityDto;
  onSuccess: () => void;
}

export const UpdateActivityForm: React.FC<Props> = ({
  activity,
  onSuccess
}): ReactElement => {
  const patchActivity = useApi(api.activitiesPATCH);
  const [description, setDescription] = useState(activity.description ?? "");
  const [startDate, setStartDate] = useState(formatDateToString(activity.startDate) ?? "");
  const [endDate, setEndDate] = useState(formatDateToString(activity.endDate) ?? "");
  const [type, setType] = useState(activityTypes[0].name);
  const msgContext = useMessageContext();
  const coursesPageContext = useCurrentCourseContext();

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    handleCloseResult();
    if (activity.id == null) { return; }
    const [err] = await patchActivity.makeAuthRequestWithErrorResponse(
      activity.id,
      createPatchOperations<ActivityDto>([
        { key: "description", value: description },
        { key: "startDate", value: startDate },
        { key: "endDate", value: endDate }
      ]));
    if (err == null) {
      msgContext.updateMessage(`Activty '${description}' have been updated`);
      updateActivity();
      onSuccess();
    } else {
      msgContext.updateErrorMessage("Activity could not be updated");
    }
  };

  const updateActivity = () => {
    coursesPageContext.updateSelectedActivity(new ActivityDto({
      id: activity.id,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    }));
  };

  const handleCloseResult = () => {
    if (patchActivity.error != null) {
      patchActivity.clearError();
    }
  };

  return (
    <form onSubmit={submit}
      className="w-full
      bg-indigo-100
      rounded-lg max-w-lg">
      <H size={3} color={TextColor.DARK_X} className="mb-2">
        {`Update activity '${activity.description}' in module 
        '${coursesPageContext.selectedModule?.name}' for
         course '${coursesPageContext.selectedCourse?.name}'`}
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
          options={activityTypes.map(type => type.name)}
          onChange={e => { setType(e.target.value); }} />
        <SubmitButton>Update Activity</SubmitButton>
      </fieldset>
    </form>
  );
};
