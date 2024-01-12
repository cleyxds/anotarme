import styled from "styled-components"

import { Button } from "../ui/atoms/Button"

export function AuthComponents() {
  return (
    <AuthButtonsContainer>
      <Button>Criar conta</Button>
      <Button>Login</Button>
    </AuthButtonsContainer>
  )
}

const AuthButtonsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 0 1.5rem;
`
