import { Link } from "react-router-dom"

import { Footer } from "./Footer"
import { AuthContainer } from "./Login"

export function SignUp() {
  return (
    <AuthContainer>
      <div>Sign Up</div>

      <Link to="/auth/login">Login</Link>

      <Footer />
    </AuthContainer>
  )
}
