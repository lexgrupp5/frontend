import { ReactNode, ReactElement } from "react";

import { LightModal } from "@/components";

interface Props {
  isOpen: boolean;
  children?: ReactNode;
  onClose: () => void;
}

export const CourseModal: React.FC<Props> = ({
  isOpen,
  children,
  onClose
}): ReactElement => {
  return (
    <LightModal
      isOpen={isOpen}
      onClose={onClose}>
      <div className="size-full flex flex-col justify-center items-center gap-4">
        {children}       
      </div>
    </LightModal>
  );
};
