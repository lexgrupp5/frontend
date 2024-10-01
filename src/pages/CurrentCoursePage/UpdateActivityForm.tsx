import { FormEventHandler, ReactElement, useState } from "react";

import { ActivityDto, api } from "@/api";
import { H, Input, SubmitButton, TextColor } from "@/components";
import { DefaultToastMessage } from "../SharedComponents";
import { useApi, useCurrentCourseContext, useMessageContext } from "@/hooks";
import { createPatchOperations, formatDateToString } from "@/utils";

interface Props {
  activity: ActivityDto;
  onSuccess: () => void;
}

export const UpdateActivityForm: React.FC<Props> = ({
  activity,
  onSuccess
}): ReactElement => {
  const patchActivity = useApi(api.activity);
  const [description, setDescription] = useState(activity.description ?? "");
  const [startDate, setStartDate] = useState(formatDateToString(activity.startDate) ?? "");
  const [endDate, setEndDate] = useState(formatDateToString(activity.endDate) ?? "");
  const [activityTypeName, setActivityTypeName] = useState(activity.activityTypeName ?? "");
  const [activityTypeDescription, setActivityTypeDescription] = useState(activity.activityTypeDescription ?? "");
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
        { key: "endDate", value: endDate },
        { key: "activityTypeName", value: activityTypeName },
        { key: "activityTypeDescription", value: activityTypeDescription }
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
      endDate: new Date(endDate),
      activityTypeName,
      activityTypeDescription
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
      <DefaultToastMessage onClose={handleCloseResult} />
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
        <Input
          label="Activity type"
          type="text"
          required
          value={activityTypeName}
          onChange={e => { setActivityTypeName(e.target.value); }} />
        <Input
          label="Activity type description"
          type="text"
          required
          value={activityTypeDescription}
          onChange={e => { setActivityTypeDescription(e.target.value); }} />
        <SubmitButton>Update Activity</SubmitButton>
      </fieldset>
    </form>
  );
};
