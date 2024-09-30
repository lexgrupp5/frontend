import { ReactElement, ReactNode } from "react";
import { TopToast } from "./TopToast";

interface Props {
  children?: ReactNode;
  keepOpen?: boolean
  onClose: () => void;
}

export const OkTopToast: React.FC<Props> = ({
  children,
  keepOpen,
  onClose
}): ReactElement => {

  return (
    <TopToast keepOpen={keepOpen} onClose={onClose} background="bg-sky-300">
      {children}
    </TopToast>
  );
};
