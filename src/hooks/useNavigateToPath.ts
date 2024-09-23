import { Path, PathType } from "@/constants";
import { useNavigate } from "react-router-dom";

export type INaviagteToPathHook = ReturnType<typeof useNavigateToPath>;

export const useNavigateToPath = () => {
  const navigate = useNavigate();

  return (path: PathType) => {
    if (path === Path.INDEX) {
      navigate(Path.INDEX);
    } else {
      navigate(`/${path}`);
    }
  };
};
