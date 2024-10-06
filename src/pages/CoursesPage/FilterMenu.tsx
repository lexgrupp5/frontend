import { ReactElement } from "react";

import { Input, P, TextColor, UnstyledButton } from "@/components";
import { formatDateToString } from "@/utils";
import { useCoursesPageContext } from "@/hooks";


export const FilterMenu = (): ReactElement => {
  const coursesPageContext = useCoursesPageContext();

  const updateEndDate = (date: string) => {
    coursesPageContext.updateSearchAndFilter({
      ...coursesPageContext.searchAndFilter,
      endDate: new Date(date)
    });
  };

  const updateStartDate = (date: string) => {
    coursesPageContext.updateSearchAndFilter({
      ...coursesPageContext.searchAndFilter,
      startDate: new Date(date)
    });
  };

  const clearFilter = () => {
    coursesPageContext.updateSearchAndFilter({
      ...coursesPageContext.searchAndFilter,
      startDate: undefined, endDate: undefined
    });
  };

  return (
    <>
      <div className="w-full flex justify-center underline">
        <P color={TextColor.DARK_X}>Filter your search</P>
      </div><div className="flex justify-between items-center w-full p-2">
        <P color={TextColor.DARK_X}>By start date:</P>
        <Input type="date"
          className="p2 border-none outline-none focus:outline-none"
          value={formatDateToString(coursesPageContext.searchAndFilter.startDate)}
          onChange={e => { updateStartDate(e.target.value); }} />
      </div>
      <div className="flex justify-between items-center w-full p-2">
        <P color={TextColor.DARK_X}>By end date:</P>
        <Input type="date"
          className="p2 border-none outline-none focus:outline-none"
          value={formatDateToString(coursesPageContext.searchAndFilter.endDate)}
          onChange={e => { updateEndDate(e.target.value); }} />
      </div>
      <UnstyledButton className="w-full mt-8 p-4 bg-indigo-200"
        onPress={clearFilter}>
        Clear Filter
      </UnstyledButton>
    </>
  );
};
