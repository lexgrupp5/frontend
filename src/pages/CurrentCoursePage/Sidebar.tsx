import { ReactElement, ReactNode } from "react";
import { TfiMenuAlt } from "react-icons/tfi";

import { IconContainer, UnstyledButton } from "@/components";
import { FaTimes } from "react-icons/fa";


interface Props {
  open: boolean
  width?: number
  children?: ReactNode
  updateOpen: (open: boolean) => void
}

export const Sidebar: React.FC<Props> = ({
  open,
  width,
  children,
  updateOpen
}): ReactElement => {
  const defaultWidth = 300;
  
  return (
    <>
      {!open
        ? <UnstyledButton
          className="fixed z-50 min-h-screen-header
          flex flex-col justify-start"
          onPress={() => { updateOpen(true); }}>
          <IconContainer className="size-12 m-2 p-2
          bg-indigo-300 rounded-full">
            <TfiMenuAlt />
          </IconContainer>
        </UnstyledButton>
        : <aside style={{ width: `${ width != null ? width : defaultWidth}px` }} 
          className="fixed z-50 h-screen-header
          bg-indigo-900 overflow-y-auto">
          <UnstyledButton onPress={() => { updateOpen(false); }}>
            <IconContainer className={"text-white size-8 m-4"}>
              <FaTimes />
            </IconContainer>
          </UnstyledButton>
          {children}
        </aside>
      }
    </>
  );
};