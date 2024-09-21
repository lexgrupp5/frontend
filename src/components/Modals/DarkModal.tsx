import { IconContainer, NativeButton } from "@/components";
import { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  children?: ReactNode;
  onClose: () => void;
}

export const DarkModal: React.FC<Props> = ({
  isOpen,
  children,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <article
      className="fixed inset-0 z-50
      flex items-center justify-center 
      bg-black bg-opacity-90"
      onClick={e => e.stopPropagation()}>
      <div className="max-h-[80vh] max-w-[90vw] lg:max-w-[50vw] z-50
      bg-indigo-950
      rounded-lg
      border border-indigo-50
      overflow-y-auto"
      onClick={e => e.stopPropagation()}>
        <div className="sticky top-2 pr-2 flex flex-row-reverse w-full">
          <NativeButton className=" focus:outline-none"
            onClick={onClose}>
            <IconContainer className="w-10 h-10
              p-2 rounded-full
            text-gray-300 cursor-pointer
            hover:bg-indigo-900">
              <FaTimes />
            </IconContainer>
          </NativeButton>
        </div>

        <div className="px-16">
          {children}
        </div>
        <div className="w-48 m-auto py-4"> 
          <NativeButton onClick={onClose}>
            Close
          </NativeButton>
        </div>
      </div>
    </article>
  );
};
