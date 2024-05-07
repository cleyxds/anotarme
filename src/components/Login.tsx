import styled from "styled-components"

import { Link } from "react-router-dom"

import { useAuthentication } from "../hooks/useAuthentication"

import { Screen } from "../ui/Screen"
import { Button } from "../ui/atoms/Button"
import { Footer } from "./Footer"

export function Login() {
  const { signInWithProvider } = useAuthentication()

  return (
    <AuthContainer>
      <div>Login</div>

      <Button onClick={signInWithProvider("google")} className="w-max">
        Barbosa Recipes API Auth Login
      </Button>

      <Link to="/auth/register">Sign Up</Link>

      <Footer />
    </AuthContainer>
  )
}

export const AuthContainer = styled(Screen)`
  padding: 0 1.25rem;
`
