import { ReactElement, ReactNode } from "react";

import { H, IconContainer } from "@/components";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

export interface SidebarProps {
  title: string;
  open: boolean;
  children: ReactNode;
  toggleOpen: () => void;
}

export const SidebarPanel: React.FC<SidebarProps> = ({
  title,
  open,
  children,
  toggleOpen
}): ReactElement => {

  return (
    <article
      className={`border-b ${open && "bg-indigo-950"}
      cursor-pointer hover:bg-indigo-950 pb-1`}
      onClick={toggleOpen}>
      <div className="flex justify-between items-center p-4 overflow-hidden">
        <H size={4}>{title}</H>
        {!open
          ?
          <IconContainer
            className="text-white size-4 cursor-pointer"><FaChevronRight />
          </IconContainer>
          : <IconContainer
            className="text-white size-4 cursor-pointer"><FaChevronDown />
          </IconContainer>
        }
      </div>
      {open && <>{children}</>}
    </article>
  );
};
