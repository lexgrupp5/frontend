import { RouterProvider } from "react-router-dom";

import { appRouter } from "@/router";
import { AuthProvider } from "@/providers/AuthProvider";

export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={appRouter}/>
    </AuthProvider>
  );
}
