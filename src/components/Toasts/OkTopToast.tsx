import { ReactElement, ReactNode } from "react";
import { TopToast } from "./TopToast";

interface Props {
  children?: ReactNode;
  keepOpen?: boolean
  headerOffset?: boolean;
  onClose: () => void;
}

export const OkTopToast: React.FC<Props> = ({
  children,
  keepOpen,
  headerOffset = true,
  onClose
}): ReactElement => {

  return (
    <TopToast
      background="bg-sky-300"
      keepOpen={keepOpen}
      headerOffset={headerOffset}
      onClose={onClose}>
      {children}
    </TopToast>
  );
};
