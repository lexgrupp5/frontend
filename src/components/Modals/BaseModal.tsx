import { IconContainer, NativeButton } from "@/components";
import { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

interface BaseModalProps {
  isOpen: boolean;
  children?: ReactNode;
  bgColor: string;
  iconColor: string;
  iconBgHoverColor: string;
  onClose: () => void;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  children,
  bgColor,
  iconColor,
  iconBgHoverColor,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <article
      className="fixed inset-0 z-30
      flex items-center justify-center 
      bg-black bg-opacity-60">
      <div className={`max-h-[80vh] w-[95vw] lg:w-[70vw]
      ${bgColor} rounded-lg
      border border-indigo-50
      overflow-y-auto`}>
        <div className="sticky top-2 pr-2 flex flex-row-reverse w-full">
          <NativeButton className="focus:outline-none" onClick={onClose}>
            <IconContainer
              className={`w-12 h-12 p-2 rounded-full ${iconColor}
              cursor-pointer hover:${iconBgHoverColor}`}>
              <FaTimes />
            </IconContainer>
          </NativeButton>
        </div>
        <div className="px-16 pb-8">{children}</div>
      </div>
    </article>
  );
};