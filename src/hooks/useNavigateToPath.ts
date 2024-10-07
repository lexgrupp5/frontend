import { Path, PathType } from "@/constants";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "./useMessageContext";

export type INaviagteToPathHook = ReturnType<typeof useNavigateToPath>;

export const useNavigateToPath = () => {
  const navigate = useNavigate();
  const messageContext = useMessageContext();

  return (path: PathType, keepMessage: boolean = false) => {
    if (!keepMessage) {
      messageContext.clearMessages();
    }

    if (path === Path.INDEX) {
      navigate(Path.INDEX);
    } else {
      navigate(`/${path}`);
    }
  };
};
