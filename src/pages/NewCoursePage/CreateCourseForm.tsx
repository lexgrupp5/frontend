import { FormEventHandler, ReactElement, useState } from "react";

import { api, CourseCreateDto } from "@/api";
import { H, Input, P, SubmitButton, TextColor, FullPageSpinner, Link } from "@/components";
import { Path } from "@/constants";
import { useCurrentCourseContext } from "@/hooks";
import { useApi } from "@/hooks/useApi";
import { useMessageContext } from "@/hooks";

export const CreateCourseForm = (): ReactElement => {
  const { updateSelectedCourse } = useCurrentCourseContext();
  const createCourse = useApi(api.coursesPOST);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const msgContext = useMessageContext();

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    msgContext.clearMessages();
    const [err, result] = await createCourse.makeAuthRequestWithErrorResponse(new CourseCreateDto({
      name,
      description,
    }));
    if (err == null) {
      updateSelectedCourse(result);
      msgContext.updateMessage(
        <Link className="underline underline-offset-4 hover:text-indigo-700" 
          to={Path.constructSelectedCoursePath(`${result?.id}`)}>
          Course {result?.name} have been created
        </Link>);
      clearInputs();
    } else {
      msgContext.updateErrorMessage(err.message);
    }
  };

  const clearInputs = () => {
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={submit}
      className="w-full p-8 
        bg-indigo-100
        rounded-lg shadow-lg max-w-lg">
      {createCourse.pending && <FullPageSpinner />}
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
        <SubmitButton>Create</SubmitButton>
      </fieldset>
    </form>
  );
};
