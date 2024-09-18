import { RouterProvider } from "react-router-dom";

import { appRouter } from "@/router";

export default function App() {
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  );
}
