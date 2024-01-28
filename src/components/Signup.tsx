import { useEffect } from "react"

import { Link, useNavigate, useSearchParams } from "react-router-dom"

import { Button } from "../ui/atoms/Button"
import { AuthContainer } from "./Login"
import { Footer } from "./Footer"
import { getMe } from "../services/user"

export function SignUp() {
  const REDIRECT_URL = "http://localhost:5173/auth/register"
  const AUTH_URL = `https://barbosarecipes-auth-2zf2mk77yq-uc.a.run.app/auth/register?redirectUrl=${REDIRECT_URL}`

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const PARAMS_TOKEN = searchParams.get("token")

  useEffect(() => {
    if (!PARAMS_TOKEN) return

    getMe(PARAMS_TOKEN)
      .then(() => {
        navigate("/chats")
      })
      .catch(() => {
        navigate("/")
      })
  }, [PARAMS_TOKEN, navigate])

  return (
    <AuthContainer>
      <div>Sign Up</div>

      <Button as="a" href={AUTH_URL} className="w-max">
        Barbosa Recipes API Auth Register
      </Button>

      <Link to="/auth/login">Login</Link>

      <Footer />
    </AuthContainer>
  )
}
