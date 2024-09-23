import { ReactElement } from "react";

export const Spinner = (): ReactElement => {
  return (
    <div className="size-full flex justify-center items-center">
      <div
        className="size-12 
        border-4 border-t-transparent border-blue-500 
        rounded-full animate-spin">
      </div>
    </div>
  );
};