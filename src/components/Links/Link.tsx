import { Path, PathType } from "@/constants";
import { useMessageContext } from "@/hooks";
import { ReactElement, ReactNode } from "react";
import { Link as LinkPlain } from "react-router-dom";

interface Props {
	to: PathType;
	children: ReactNode;
  className?: string
}

export const Link: React.FC<Props> = ({
  to,
  children,
  className
}): ReactElement => {
  const messageContext = useMessageContext();

  const clearGlobalMessages = () => {
    messageContext.clearMessages();
  };

  return (
    <LinkPlain 
      className={`${className ? className : ""}`}
      onClick={clearGlobalMessages}
      to={to === Path.INDEX ? Path.INDEX : `/${to}`}>
      {children}
    </LinkPlain>
  );
};
