import React, { ReactElement, ReactNode } from "react";
import { H, P } from "../Text";
import { IconContainer } from "../Icons";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  page: number;
  nrOfPages?: number;
  onNext: () => void;
  onPrev: () => void;
}

interface PropsWithChildren extends Props {
  children?: ReactNode
}

export const PageNavigation: React.FC<PropsWithChildren> = ({
  page,
  nrOfPages,
  children,
  onPrev,
  onNext
}): ReactElement => {

  return (
    <>
      {children == null
        ? <InnerPageNavigation
          page={page}
          nrOfPages={nrOfPages}
          onPrev={onPrev}
          onNext={onNext} />
        : (
          <>
            <InnerPageNavigation
              page={page}
              nrOfPages={nrOfPages}
              onPrev={onPrev}
              onNext={onNext} />
            {children}
            <InnerPageNavigation
              page={page}
              nrOfPages={nrOfPages}
              onPrev={onPrev}
              onNext={onNext} />
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
  onNext
}) => {
  const isFirstPage = () => {
    return page === 1;
  };

  const isLastPage = () => {
    return nrOfPages == null
      ? false 
      : page >= nrOfPages;
  };

  return (
    <article className="w-full flex justify-center items-center">
      <button
        disabled={isFirstPage()}
        type="button"
        onClick={() => { onPrev(); }}>
        <IconContainer className="text-white size-8 cursor">
          <FaChevronLeft />
        </IconContainer>
      </button>

      {nrOfPages == null
        ? <H size={3} className="mx-8">{`Page: ${page}`}</H> 
        : <H size={3} className="mx-8">{`${page} / ${nrOfPages}`}</H>}
      <button
        disabled={isLastPage()}
        type="button"
        onClick={() => { onNext(); }}>
        <IconContainer className="text-white size-8 cursor">
          <FaChevronRight />
        </IconContainer>
      </button>
    </article>
  );
};
