import React, { ReactElement, ReactNode } from "react";
import { H, P } from "../Text";
import { IconContainer } from "../Icons";
import { LuChevronLeft, LuChevronRight, LuChevronLast, LuChevronFirst } from "react-icons/lu";
import { TransparentSelectMenu } from "../Inputs";

interface Props {
  page: number;
  nrOfPages?: number;
  onNext: () => void;
  onPrev: () => void;
  updatePage: (page: number) => void
}

interface PropsWithChildren extends Props {
  children?: ReactNode
}

export const PageNavigation: React.FC<PropsWithChildren> = ({
  page,
  nrOfPages,
  children,
  onPrev,
  onNext,
  updatePage
}): ReactElement => {

  return (
    <>
      {children == null
        ? <InnerPageNavigation
          page={page}
          nrOfPages={nrOfPages}
          onPrev={onPrev}
          onNext={onNext}
          updatePage={updatePage} />
        : (
          <>
            <InnerPageNavigation
              page={page}
              nrOfPages={nrOfPages}
              onPrev={onPrev}
              onNext={onNext}
              updatePage={updatePage} />
            {children}
            <InnerPageNavigation
              page={page}
              nrOfPages={nrOfPages}
              onPrev={onPrev}
              onNext={onNext}
              updatePage={updatePage} />
          </>
        )
      }
    </>
  );
};

const InnerPageNavigation: React.FC<Props> = ({
  page,
  nrOfPages,
  onPrev,
  onNext,
  updatePage
}) => {
  const isFirstPage = () => {
    return page === 1;
  };

  const isLastPage = () => {
    return nrOfPages == null
      ? false
      : page >= nrOfPages;
  };

  const constructOptions = (nrOfPages: number) => {
    return Array.from({ length: nrOfPages }, (_, index) => (
      `${index + 1} / ${nrOfPages}`
    ));
  };

  const handleChange = (label: string) => {
    const page = Number(label.split("/")[0].trim());
    updatePage(page);
  };

  return (
    <article className="w-full flex justify-center items-center gap-0 sm:gap-6">
      {nrOfPages != null && <PaginationButton
        disabled={isFirstPage()}
        onSelect={() => { updatePage(1); }}>
        <IconContainer className="text-white size-8 cursor">
          <LuChevronFirst />
        </IconContainer>
      </PaginationButton>}
      <PaginationButton
        disabled={isFirstPage()}
        onSelect={() => { onPrev(); }}>
        <IconContainer className="text-white size-8 cursor">
          <LuChevronLeft />
        </IconContainer>
      </PaginationButton>

      {nrOfPages == null
        ? <H size={3} >{`Page: ${page}`}</H>
        : <TransparentSelectMenu
          options={constructOptions(nrOfPages)}
          value={constructOptions(nrOfPages)[page - 1]}
          onChange={(e) => { handleChange(e.target.value); }} />}
      <PaginationButton
        disabled={isLastPage()}
        onSelect={() => { onNext(); }}>
        <IconContainer className="text-white size-8 cursor">
          <LuChevronRight />
        </IconContainer>
      </PaginationButton>
      {nrOfPages != null && <PaginationButton
        disabled={isLastPage()}
        onSelect={() => { updatePage(nrOfPages); }}>
        <IconContainer className="text-white size-8 cursor">
          <LuChevronLast />
        </IconContainer>
      </PaginationButton>}
    </article>
  );
};

const PaginationButton: React.FC<{
  disabled: boolean;
  children: ReactNode;
  onSelect: () => void;
}> = ({
  disabled,
  children,
  onSelect
}): ReactElement => {
  return (
    <button className="p-2 rounded-lg hover:border-white hover:ring-2 hover:ring-white"
      disabled={disabled}
      type="button"
      onClick={onSelect}>
      {children}
    </button>
  );
};
