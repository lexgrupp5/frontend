import { ReactElement } from "react";

import { Input, P, TextColor, UnstyledButton } from "@/components";
import { formatDateToString } from "@/utils";
import { ISearchAndFilterDTO } from "@/contexts";

interface Props {
  searchAndFilterDTO: ISearchAndFilterDTO;
  updateSearchAndFilterDTO: (dto: ISearchAndFilterDTO) => void;
}

export const FilterMenu: React.FC<Props> = ({
  searchAndFilterDTO,
  updateSearchAndFilterDTO
}): ReactElement => {

  const updateEndDate = (date: string) => {
    updateSearchAndFilterDTO({ ...searchAndFilterDTO, endDate: new Date(date) });
  };

  const updateStartDate = (date: string) => {
    updateSearchAndFilterDTO({
      ...searchAndFilterDTO, startDate: new Date(date)
    });
  };

  const clearFilter = () => {
    updateSearchAndFilterDTO({
      ...searchAndFilterDTO, startDate: undefined, endDate: undefined
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
          value={formatDateToString(searchAndFilterDTO.startDate)}
          onChange={e => { updateStartDate(e.target.value); }} />
      </div><div className="flex justify-between items-center w-full p-2">
        <P color={TextColor.DARK_X}>By end date:</P>
        <Input type="date"
          className="p2 border-none outline-none focus:outline-none"
          value={formatDateToString(searchAndFilterDTO.endDate)}
          onChange={e => { updateEndDate(e.target.value); }} />
      </div><UnstyledButton className="w-full mt-8 p-4 bg-indigo-200"
        onPress={clearFilter}>
        Clear Filter
      </UnstyledButton>
    </>
  );
};
