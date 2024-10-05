import { createContext, ReactNode } from "react";

interface IMessageContextProps {
  message: ReactNode;
  errorMessage: string | null;
  updateMessage: (msg: ReactNode) => void;
  updateErrorMessage: (err: string | null) => void;
  clearMessages: () => void;
}

export const MessageContext = createContext<IMessageContextProps | null>(null);
