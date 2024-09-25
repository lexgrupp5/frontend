import { ReactElement, ReactNode, useEffect } from "react";
import { IconContainer } from "../Icons";
import { FaTimes } from "react-icons/fa";
import { UnstyledButton } from "../Buttons";

interface Props {
  children?: ReactNode;
  background?: string;
  keepOpen?: boolean
  onClose: () => void;
}

export const TopToast: React.FC<Props> = ({
  children,
  background,
  keepOpen,
  onClose
}): ReactElement => {

  useEffect(() => {
    if (keepOpen) { return; }
    const timer = setTimeout(() => {
      onClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-[var(--header-height)] left-0 right-0 z-50">
      <div className={`flex justify-between items-center gap-4 p-2
        ${background != null ? background  : "bg-sky-500"}
        md:relative md:justify-center`}>
        {children}
        {keepOpen && <UnstyledButton className="md:absolute right-2"
          onPress={onClose}>
          <IconContainer>
            <FaTimes />
          </IconContainer>
        </UnstyledButton>}
      </div>
    </div>
  );
};