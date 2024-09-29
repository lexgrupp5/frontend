import { ReactElement, ReactNode, useEffect } from "react";
import { IconContainer } from "../Icons";
import { FaTimes } from "react-icons/fa";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { UnstyledButton } from "../Buttons";

interface Props {
  children?: ReactNode;
  background?: string;
  keepOpen?: boolean
  timeMilliseconds?: number
  onClose: () => void;
}

export const TopToast: React.FC<Props> = ({
  children,
  background,
  keepOpen,
  timeMilliseconds,
  onClose
}): ReactElement => {
  const defautlTime = 10 * 1000;

  useEffect(() => {
    if (keepOpen) { return; }
    const timer = setTimeout(() => {
      onClose();
    }, timeMilliseconds != null ? timeMilliseconds : defautlTime);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-[var(--header-height)] left-0 right-0 z-50">
      <div className={`flex items-center justify-between gap-4 p-2
        ${background != null ? background  : "bg-sky-500"}`}>
        {<IconContainer className="size-6 flex-shrink-0">
          <MdOutlineNotificationsActive />
        </IconContainer>}
        {children}
        {<UnstyledButton className="size-6 flex-shrink-0"
          onPress={onClose}>
          <IconContainer>
            <FaTimes />
          </IconContainer>
        </UnstyledButton>}
      </div>
    </div>
  );
};