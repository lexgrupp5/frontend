import { ReactElement } from "react";
import { Spinner } from "./Spinner";

export const FullPageSpinner = (): ReactElement => {
  return (
    <article className="fixed inset-0 h-screen w-screen z-50 bg-black bg-opacity-30">
      <Spinner />
    </article>
  );
};
