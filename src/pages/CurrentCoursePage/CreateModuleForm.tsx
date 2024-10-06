import { FormEventHandler, ReactElement, useState } from "react";

import { api, ModuleCreateDto } from "@/api";
import { H, Input, SubmitButton, TextColor } from "@/components";
import { useApi, useCurrentCourseContext, useMessageContext } from "@/hooks";

interface Props {
  title?: string
  hasModules: (hasModules: boolean) => void;
}

export const CreateModuleForm: React.FC<Props> = ({
  title,
  hasModules
}): ReactElement => {
  const createModule = useApi(api.modulesPOST);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const msgContext = useMessageContext();
  const coursesPageContext = useCurrentCourseContext();

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    createModule.clearError();

    if (coursesPageContext.selectedCourse?.id == null) {
      return;
    }
    const [err, result] = await createModule.makeAuthRequestWithErrorResponse( 
      new ModuleCreateDto({
        courseId: coursesPageContext.selectedCourse.id,
        name,
        description
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
        <SubmitButton>Create Module</SubmitButton>
      </fieldset>
    </form>
  );
};
