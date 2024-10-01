import { FormEventHandler, ReactElement, useState } from "react";

import { api, CourseCreateDto, type CourseDto } from "@/api";
import { H, Input, P, SubmitButton, TextColor, UnstyledButton, OkTopToast, ErrorTopToast, FullPageSpinner } from "@/components";
import { Path } from "@/constants";
import { useCoursesPageContext, useNavigateToPath } from "@/hooks";
import { useApi } from "@/hooks/useApi";
import { useMessageContext } from "@/hooks";

export const CreateCourseForm = (): ReactElement => {
  const { updateSelectedCourse } = useCoursesPageContext();
  const navigate = useNavigateToPath();
  const createCourse = useApi(api.createCourse);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const msgContext = useMessageContext();

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    msgContext.clearMessages();
    const [err, result] = await createCourse.makeAuthRequestWithErrorResponse(new CourseCreateDto({
      name,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    }));
    if (err == null) {
      msgContext.updateMessage(
        `New course '${result?.name}' created`
      );
      clearInputs();
    } else {
      msgContext.updateErrorMessage("Course could not be created");
    }
  };

  const clearInputs = () => {
    setName("");  
    setDescription("");
    setStartDate("");
    setEndDate("");
  };

  const handleNavigateToNewCourse = (course: CourseDto | null) => {
    if (course == null) { return; }
    updateSelectedCourse(course);
    msgContext.clearMessages();
    navigate(Path.constructSelectedCoursePath(`${createCourse.data?.id}`));
  };

  return (
    <form onSubmit={submit}
      className="w-full p-8 
        bg-indigo-100
        rounded-lg shadow-lg max-w-lg">
      {createCourse.pending && <FullPageSpinner />}
      {msgContext.message != null &&
        <OkTopToast onClose={msgContext.clearMessages} keepOpen={true}>
          <UnstyledButton className="underline underline-offset-4 max-w-full"
            onPress={() => { handleNavigateToNewCourse(createCourse.data); }}>
            {msgContext.message}
          </UnstyledButton>
        </OkTopToast>
      }
      {msgContext.errorMessage != null &&
        <ErrorTopToast onClose={msgContext.clearMessages} keepOpen={true}>
          {msgContext.errorMessage}
        </ErrorTopToast>
      }
      <H size={1} color={TextColor.DARK_X} className="mb-2">Create new course</H>
      <P color={TextColor.DARK} className="mb-6">
        Please enter course details below
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
  );
};