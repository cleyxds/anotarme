import { useEffect } from "react"

import styled from "styled-components"

import { Link, useNavigate, useSearchParams } from "react-router-dom"

import { useSetRecoilState } from "recoil"
import { AuthAtom } from "../atoms/Auth"
import { UserAtom } from "../atoms/User"

import { Screen } from "../ui/Screen"
import { Button } from "../ui/atoms/Button"
import { Footer } from "./Footer"

import { getMe, verifyToken } from "../services/user"

import { Auth } from "../types/auth"
import { User } from "../types/user"

export function Login() {
  const REDIRECT_URL = "http://192.168.0.104:5173/auth/login"
  const DEV_AUTH_URL = "http://192.168.0.104:4444/auth/login"
  const PROD_AUTH_URL =
    "https://barbosarecipes-auth-2zf2mk77yq-uc.a.run.app/auth/login"
  const AUTH_URL = `${DEV_AUTH_URL}?redirectUrl=${REDIRECT_URL}`

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const setAuthAtom = useSetRecoilState(AuthAtom)
  const setUserAtom = useSetRecoilState(UserAtom)

  const PARAMS_TOKEN = searchParams.get("token")

  useEffect(() => {
    if (!PARAMS_TOKEN) return

    const handleRedirect = (data: any) => {
      navigate("/chats")

      return data
    }

    const handleError = (error: any) => {
      console.error(error)

      navigate("/")
    }

    const authUser = (authData: Auth) => {
      setAuthAtom({ ...authData, isAuthenticated: true })

      return authData.accessToken
    }

    const setUser = (user: User) => {
      setUserAtom(user)

      return user
    }

    verifyToken(PARAMS_TOKEN)
      .then(authUser)
      .then(getMe)
      .then(setUser)
      .then(handleRedirect)
      .catch(handleError)
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
