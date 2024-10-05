import { MessageContext } from "@/contexts";
import { ReactElement, ReactNode, useState } from "react";

interface Props {
  children: ReactNode
}

export const MessageProvider: React.FC<Props> = ({
  children
}): ReactElement => {
  const [message, setMessage] = useState<ReactNode>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateMessage = (msg: ReactNode) => {
    setMessage(msg);
  };
  
  const updateErrorMessage = (err: string | null) => {
    setErrorMessage(err);
  };
  
  const clearMessages = () => {
    setMessage(null);
    setErrorMessage(null);
  };

  return (
    <>
      <MessageContext.Provider value={{
        message,
        errorMessage,
        updateMessage,
        updateErrorMessage,
        clearMessages
      }}>
        {children}
      </MessageContext.Provider>
    </>
  );
};
