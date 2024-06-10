import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

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

const queryClient = new QueryClient()

export function Routes() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
