import { FormEventHandler, ReactElement, useState } from "react";

import { api, ModuleDto } from "@/api";
import { FullPageSpinner, H, Input, SubmitButton, TextColor } from "@/components";
import { createPatchOperations } from "@/utils";
import { useApi, useCurrentCourseContext, useMessageContext } from "@/hooks";

interface Props {
  module: ModuleDto;
  onSuccess: () => void;
}

export const UpdateModuleForm: React.FC<Props> = ({
  module,
  onSuccess
}): ReactElement => {
  const patchModule = useApi(api.modulesPATCH);
  const [name, setName] = useState(module.name ?? "");
  const [description, setDescription] = useState(module.description ?? "");
  const msgContext = useMessageContext();
  const coursesPageContext = useCurrentCourseContext();

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    msgContext.clearMessages();
    if (module.id == null) { return; }

    const [err] = await patchModule.makeAuthRequestWithErrorResponse(
      module.id,
      createPatchOperations<ModuleDto>([
        { key: "name", value: name },
        { key: "description", value: description }
      ]));
    if (err == null) {
      msgContext.updateMessage(`Module '${name}' have been updated`);
      updateModule();
      onSuccess();
    } else {
      msgContext.updateErrorMessage(err.message);
    }
  };

  const updateModule = () => {
    coursesPageContext.updateSelectedModule(new ModuleDto({
      id: module.id,
      name,
      description
    }));
  };

  return (
    <form onSubmit={submit}
      className="w-full
      bg-indigo-100
      rounded-lg max-w-lg">
      {patchModule.pending && <FullPageSpinner />}
      <H size={3} color={TextColor.DARK_X} className="mb-2">
        Update module '{module.name}' in course '{coursesPageContext.selectedCourse?.name}'
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
        <SubmitButton>Update Module</SubmitButton>
      </fieldset>
    </form>
  );
};