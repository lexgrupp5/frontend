import { ReactElement, ReactNode } from "react";
import { TopToast } from "./TopToast";

interface Props {
  children?: ReactNode;
  keepOpen?: boolean
  headerOffset?: boolean
  onClose: () => void;
}

export const ErrorTopToast: React.FC<Props> = ({
  children,
  keepOpen,
  headerOffset = true,
  onClose
}): ReactElement => {

  return (
    <TopToast
      background="bg-rose-500"
      keepOpen={keepOpen}
      headerOffset={headerOffset}
      onClose={onClose}>
      {children}
    </TopToast>
  );
};
