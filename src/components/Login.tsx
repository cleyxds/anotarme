import styled from "styled-components"

import { Link } from "react-router-dom"

import { Screen } from "../ui/Screen"
import { Footer } from "./Footer"

export function Login() {
  return (
    <AuthContainer>
      <div>Login</div>

      <Link to="/auth/register">Sign Up</Link>

      <Footer />
    </AuthContainer>
  )
}

export const AuthContainer = styled(Screen)`
  padding: 0 1.25rem;
`
