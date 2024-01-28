import { useEffect } from "react"

import styled from "styled-components"

import { Link, useNavigate, useSearchParams } from "react-router-dom"

import { Screen } from "../ui/Screen"
import { Button } from "../ui/atoms/Button"
import { Footer } from "./Footer"
import { verifyToken } from "../services/user"

export function Login() {
  const REDIRECT_URL = "http://localhost:5173/auth/login"
  const AUTH_URL = `https://barbosarecipes-auth-2zf2mk77yq-uc.a.run.app/auth/login?redirectUrl=${REDIRECT_URL}`

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const PARAMS_TOKEN = searchParams.get("token")

  useEffect(() => {
    if (!PARAMS_TOKEN) return

    console.log("PARAMS_TOKEN", PARAMS_TOKEN)

    verifyToken(PARAMS_TOKEN)
      .then(() => navigate("/chats"))
      .catch(() => navigate("/"))
  }, [PARAMS_TOKEN, navigate])

  return (
    <AuthContainer>
      <div>Login</div>

      <Button as="a" href={AUTH_URL} className="w-max">
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
