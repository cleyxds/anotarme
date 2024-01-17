import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Landing } from "./components/Landing"
import { Chat } from "./components/Chat"
import { Login } from "./components/Login"
import { SignUp } from "./components/Signup"
import { Profile } from "./components/Profile"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <SignUp />,
  },
  {
    path: "/chats",
    element: <Chat />,
  },
  {
    path: "/profile/:userId",
    element: <Profile />,
  },
])

export function Routes() {
  return <RouterProvider router={router} />
}
