import { ReactNode } from "react";
import { BaseModal } from "./BaseModal";

interface Props {
  isOpen: boolean;
  children?: ReactNode;
  fixedSize?: boolean
  onClose: () => void;
}

export const DarkModal: React.FC<Props> = ({
  isOpen,
  children,
  fixedSize,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen}
      bgColor="bg-indigo-950"
      iconColor="text-gray-200"
      iconBgHoverColor="bg-indigo-900"
      fixedSize={fixedSize}
      onClose={onClose}>
      {children}
    </BaseModal>
  );
};
