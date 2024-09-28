import { ReactElement, ReactNode } from "react";
import { TfiMenuAlt } from "react-icons/tfi";

import { IconContainer, UnstyledButton } from "@/components";
import { FaTimes } from "react-icons/fa";


interface Props {
  open: boolean;
  width?: number;
  children?: ReactNode;
  updateOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<Props> = ({
  open,
  children,
  width,
  updateOpen
}): ReactElement => {
  const defaultWidth = 300;
  const widthStyle = { width: `${width != null ? width : defaultWidth}px` };

  return (
    <>
      {!open
        ? <UnstyledButton
          className="fixed z-50"
          onPress={() => { updateOpen(true); }}>
          <IconContainer className="size-12 m-2 p-2
          bg-indigo-300 opacity-70 rounded-full">
            <TfiMenuAlt />
          </IconContainer>
        </UnstyledButton>
        : <>
          <aside style={widthStyle}
            className="fixed z-20 h-screen-header
            bg-indigo-900 overflow-y-auto">  
            <UnstyledButton
              onPress={() => { updateOpen(false); }}>
              <IconContainer className="text-white size-12 m-2 p-2">
                <FaTimes />
              </IconContainer>
            </UnstyledButton>
            {children}
          </aside>
        </>
      }
    </>
  );
};