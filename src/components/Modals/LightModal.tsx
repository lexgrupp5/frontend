import { ReactNode } from "react";
import { BaseModal } from "./BaseModal";

interface Props {
  isOpen: boolean;
  children?: ReactNode;
  onClose: () => void;
}

export const LightModal: React.FC<Props> = ({
  isOpen,
  children,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen}
      bgColor="bg-indigo-100"
      iconColor="text-black"
      iconBgHoverColor="bg-indigo-400"
      onClose={onClose}>
      {children}
    </BaseModal>
  );
};
