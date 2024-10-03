import { Path, PathType } from "@/constants";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "./useMessageContext";

export type INaviagteToPathHook = ReturnType<typeof useNavigateToPath>;

export const useNavigateToPath = (keepMessage: boolean = false) => {
  const navigate = useNavigate();
  const messageContext = useMessageContext();

  return (path: PathType) => {
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
