import { ReactElement, useRef } from "react";
import { MdFilterList } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

import { IconContainer, Input, UnstyledButton } from "@/components";
import { useCoursePageContext } from "@/hooks";
import { FilterMenu } from "./FilterMenu";

export const CoursesController = (): ReactElement => {
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const {
    searchAndFilterDTO,
    updateSearchAndFilterDTO,
    fetchCourses
  } = useCoursePageContext();

  const handleSearch = () => {
    console.log(searchAndFilterDTO);
    fetchCourses(searchAndFilterDTO);
  };

  const updateSearchText = (searchText: string) => {
    updateSearchAndFilterDTO({ ...searchAndFilterDTO, searchText });
  };

  const toggleFilterMenu = () => {
    filterMenuRef.current?.classList.toggle("hidden");
    inputContainerRef.current?.classList.toggle("rounded-b-lg");
  };

  const selectSearchFocus = () => {
    filterMenuRef.current?.classList.add("hidden");
    inputContainerRef.current?.classList.add("rounded-b-lg");
  };

  return (
    <article className="flex flex-row mt-4 justify-center">
      <div ref={inputContainerRef}
        className="relative flex items-cente p-2 rounded-t-lg rounded-b-lg bg-white">
        <Input type="text"
          className="py-2 px-4 w-full border-none outline-none focus:outline-none"
          placeholder="search text..."
          maxLength={100}
          icon={<MdFilterList className="text-black" />}
          onSelectIcon={toggleFilterMenu}
          onFocus={selectSearchFocus}
          value={searchAndFilterDTO.searchText ?? ""}
          onChange={e => { updateSearchText(e.target.value); }} />
        <UnstyledButton className="focus:outline-indigo-500"
          onPress={handleSearch}>
          <IconContainer className="size-10 p-2 border-none focus:outline-none"><FaSearch /></IconContainer>
        </UnstyledButton>
        <FilterMenu ref={filterMenuRef} 
          searchAndFilterDTO={searchAndFilterDTO}
          updateSearchAndFilterDTO={updateSearchAndFilterDTO}/>
      </div>
    </article>
  );
};
