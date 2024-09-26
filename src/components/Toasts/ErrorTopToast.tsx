import { ReactElement, ReactNode } from "react";
import { TopToast } from "./TopToast";

interface Props {
  children?: ReactNode;
  keepOpen?: boolean
  onClose: () => void;
}

export const ErrorTopToast: React.FC<Props> = ({
  children,
  keepOpen,
  onClose
}): ReactElement => {

  return (
    <TopToast keepOpen={keepOpen} onClose={onClose} background="bg-rose-500">
      {children}
    </TopToast>
  );
};
