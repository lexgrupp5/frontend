import { FormEventHandler, ReactElement, useState } from "react";

import { api, CourseDto, ICourseDto } from "@/api";
import { H, Input, SubmitButton, TextColor, FullPageSpinner } from "@/components";
import { useApi } from "@/hooks/useApi";
import { createPatchOperations, formatDateToString } from "@/utils";
import { useCurrentCourseContext, useMessageContext } from "@/hooks";
import { DefaultToastMessage } from "../SharedComponents";

interface Props {
  course: ICourseDto;
  onSuccess: () => void;
}

export const UpdateCourseForm: React.FC<Props> = ({
  course,
  onSuccess
}): ReactElement => {
  const patchCourse = useApi(api.coursesPATCH);
  const getCourse = useApi(api.coursesGET);
  const [name, setName] = useState(course.name ?? "");
  const [description, setDescription] = useState(course.description ?? "");
  const [startDate, setStartDate] = useState(formatDateToString(course.startDate) ?? "");
  const [endDate, setEndDate] = useState(formatDateToString(course.endDate) ?? "");
  const { selectedCourse, updateSelectedCourse } = useCurrentCourseContext();
  const msgContext = useMessageContext();

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    msgContext.clearMessages();
    if (course.id == null) { return; }

    const [err] = await patchCourse.makeAuthRequestWithErrorResponse(
      course.id,
      createPatchOperations<CourseDto>([
        { key: "name", value: name },
        { key: "description", value: description },
        { key: "startDate", value: startDate },
        { key: "endDate", value: endDate },
      ]));
    if (err == null) {
      await updateCourse();
      onSuccess();
    } else {
      msgContext.updateErrorMessage("Course could not be updated");
    }
  };

  const updateCourse = async () => {
    if (selectedCourse?.id == null) {
      return;
    }
    const [err, result] = await getCourse.makeAuthRequestWithErrorResponse(selectedCourse.id);
    if (err == null && result != null) {
      updateSelectedCourse(result);
      msgContext.updateMessage(`Course ${result.name} have been updated`);
    } else {
      msgContext.updateErrorMessage("Updated course could not be fetched");
    }
  };

  const handleCloseResult = () => {
    if (patchCourse.error != null) {
      patchCourse.clearError();
    }
  };

  return (
    <form onSubmit={submit}
      className="w-full
      bg-indigo-100
      rounded-lg max-w-lg">
      {patchCourse.pending && <FullPageSpinner />}
      <DefaultToastMessage onClose={handleCloseResult} />
      <H size={3} color={TextColor.DARK_X} className="mb-2">
        Update course '{course.name}'
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
        <SubmitButton>Update Course</SubmitButton>
      </fieldset>
    </form>
  );
};