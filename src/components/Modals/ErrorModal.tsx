import { ReactNode } from "react";
import { BaseModal } from "./BaseModal";

interface Props {
  isOpen: boolean;
  children?: ReactNode;
  onClose: () => void;
}

export const ErrorModal: React.FC<Props> = ({
  isOpen,
  children,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen}
      bgColor="bg-red-950"
      iconColor="text-gray-200"
      iconBgHoverColor="bg-red-900"
      onClose={onClose}>
      {children}
    </BaseModal>
  );
};
