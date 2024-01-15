import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Landing } from "./components/Landing"
import { Chat } from "./components/Chat"
import { Login } from "./components/Login"
import { SignUp } from "./components/Signup"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/chats",
    element: <Chat />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <SignUp />,
  },
])

export function Routes() {
  return <RouterProvider router={router} />
}
