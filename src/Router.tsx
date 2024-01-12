import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Landing } from "./components/Landing"
import { Chat } from "./components/Chat"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "chat",
    element: <Chat />,
  },
])

export function Routes() {
  return <RouterProvider router={router} />
}
