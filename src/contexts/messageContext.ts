import { createContext } from "react";

interface IMessageContextProps {
  message: string | null;
  errorMessage: string | null;
  updateMessage: (msg: string | null) => void;
  updateErrorMessage: (err: string | null) => void;
  clearMessages: () => void;
}

export const MessageContext = createContext<IMessageContextProps | null>(null);
