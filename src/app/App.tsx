import { RouterProvider } from "react-router-dom";

import { appRouter } from "@/router";
import { AuthProvider, MessageProvider } from "@/providers";

export function App() {
  return (
    <MessageProvider>
      <AuthProvider>
        <RouterProvider router={appRouter}/>
      </AuthProvider>
    </MessageProvider>
  );
}
