import { FormEventHandler, ReactElement, useState } from "react";

import { api, CourseDto, ICourseDto } from "@/api";
import { H, Input, P, SubmitButton, TextColor, UnstyledButton, OkTopToast, ErrorTopToast, FullPageSpinner, LightModal } from "@/components";
import { useApi } from "@/hooks/useApi";
import { createPatchOperations, formatDateToString } from "@/utils";
import { useCoursesPageContext } from "@/hooks";

interface Props {
  course: ICourseDto;
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateCourseForm: React.FC<Props> = ({
  course,
  isOpen,
  onClose
}): ReactElement => {
  const patchCourse = useApi(api.coursesPATCH);
  const getCourse = useApi(api.getCourse);
  const [name, setName] = useState(course.name ?? "");
  const [description, setDescription] = useState(course.description ?? "");
  const [startDate, setStartDate] = useState(formatDateToString(course.startDate) ?? "");
  const [endDate, setEndDate] = useState(formatDateToString(course.endDate) ?? "");
  const { selectedCourse, updateSelectedCourse } = useCoursesPageContext();
  const [showResult, setShowResult] = useState(false);

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    handleCloseResult();
    if (course.id == null) { return; }

    const [err] = await patchCourse.makeAuthRequestWithErrorResponse(course.id, createPatchOperations<CourseDto>([
      { key: "name", value: name },
      { key: "description", value: description },
      { key: "startDate", value: startDate },
      { key: "endDate", value: endDate },
    ]));
    if (err == null) {
      await updateCourse();
    }
    setShowResult(true);
  };

  const updateCourse = async () => {
    if (selectedCourse?.id == null) {
      return;
    }
    const updatedCourse = await getCourse.makeAuthRequest(selectedCourse.id);
    if (updatedCourse != null) { 
      console.log("???????");
      updateSelectedCourse(updatedCourse); 
    }
  };

  const handleCloseForm = () => {
    handleCloseResult();
    onClose();
  };

  const handleCloseResult = () => {
    setShowResult(false);
    if (patchCourse.error != null) {
      patchCourse.clearError();
    }
  };

  return (
    <LightModal
      isOpen={isOpen}
      onClose={handleCloseForm}>
      <div className="w-full h-full">
        {patchCourse.pending && <FullPageSpinner />}
        <form onSubmit={submit}
          className="w-full
        bg-indigo-100
        rounded-lg max-w-lg">
          {showResult && patchCourse.error == null &&
            <OkTopToast onClose={handleCloseResult}>
              <UnstyledButton className="max-w-full"
                onPress={() => { }}>
                Course '{course.name}' updated
              </UnstyledButton>
            </OkTopToast>
          }
          {showResult && patchCourse.error != null &&
            <ErrorTopToast onClose={handleCloseResult} keepOpen={true}>
              Course could not be updated
            </ErrorTopToast>
          }
          <H size={3} color={TextColor.DARK_X} className="mb-2">
            Course: {course.name}
          </H>
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
            <SubmitButton>Update</SubmitButton>
          </fieldset>
        </form>
      </div>
    </LightModal>
  );
};