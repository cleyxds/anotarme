import styled from "styled-components"

import { Button } from "../ui/atoms/Button"
import { Text } from "../ui/atoms/Text"

import Logo from "../assets/Logo"

export function Header() {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo size={40} />

        <Text>Anotar me</Text>
      </LogoContainer>

      <NavigationContainer>
        <Button>Chat</Button>

        <Button>Compartilhar</Button>

        <Button>Sobre o app</Button>
      </NavigationContainer>
    </HeaderContainer>
  )
}

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 4rem;

  @media (max-width: 910px) {
    flex-direction: column;
    row-gap: 1rem;
  }
`

const NavigationContainer = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  min-height: 2.5rem;

  @media (max-width: 572px) {
    flex-direction: column;
    row-gap: 0.75rem;
  }
`
