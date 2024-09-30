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

interface Props {
  open: boolean;
  width?: number;
  children?: ReactNode;
  footer?: ReactNode;
  updateOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<Props> = ({
  open,
  children,
  width,
  footer,
  updateOpen,
}): ReactElement => {
  const defaultWidth = 300;
  const widthStyle = { width: `${width != null ? width : defaultWidth}px` };

  return (
    <>
      {!open
        ? <UnstyledButton
          className="fixed z-20"
          onPress={() => { updateOpen(true); }}>
          <IconContainer className="size-12 m-2 p-2 bg-indigo-300 opacity-70 rounded-full">
            <TfiMenuAlt />
          </IconContainer>
        </UnstyledButton>
        : <>
          <aside
            style={widthStyle}
            className="overflow-y-auto fixed z-20 h-screen-header bg-indigo-900 flex flex-col"
          >
            <div className="sticky top-0 bg-indigo-900 border-b">
              <UnstyledButton onPress={() => { updateOpen(false); }}>
                <IconContainer className="text-white size-12 m-2 p-2">
                  <FaTimes />
                </IconContainer>
              </UnstyledButton>
            </div>
            
            <div className="flex-1">
              {children}
            </div>

            {footer && (
              <div className="sticky bottom-0 
                bg-indigo-900 border-t">
                {footer}
              </div>
            )}
          </aside>
        </>
      }
    </>
  );
};


// export const Sidebar: React.FC<Props> = ({
//   open,
//   children,
//   width,
//   updateOpen
// }): ReactElement => {
//   const defaultWidth = 300;
//   const widthStyle = { width: `${width != null ? width : defaultWidth}px` };

//   return (
//     <>
//       {!open
//         ? <UnstyledButton
//           className="fixed z-20"
//           onPress={() => { updateOpen(true); }}>
//           <IconContainer className="size-12 m-2 p-2
//           bg-indigo-300 opacity-70 rounded-full">
//             <TfiMenuAlt />
//           </IconContainer>
//         </UnstyledButton>
//         : <>
//           <aside style={widthStyle}
//             className="fixed z-20 h-screen-header
//             bg-indigo-900 overflow-y-auto">  
//             <UnstyledButton
//               onPress={() => { updateOpen(false); }}>
//               <IconContainer className="text-white size-12 m-2 p-2">
//                 <FaTimes />
//               </IconContainer>
//             </UnstyledButton>
//             {children}
//           </aside>
//         </>
//       }
//     </>
//   );
// };