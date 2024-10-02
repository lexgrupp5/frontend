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
  headerOffset?: boolean
  onClose: () => void;
}

export const TopToast: React.FC<Props> = ({
  children,
  background,
  keepOpen,
  timeMilliseconds,
  headerOffset = true,
  onClose
}): ReactElement => {
  const defautlTime = 5 * 1000;

  useEffect(() => {
    if (keepOpen) { return; }
    const timer = setTimeout(() => {
      onClose();
    }, timeMilliseconds != null ? timeMilliseconds : defautlTime);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed left-0 right-0 z-40 ${headerOffset ?
      "top-[var(--header-height)]" : "top-0"}`}>
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