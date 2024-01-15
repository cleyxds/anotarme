import styled from "styled-components"

import { Link } from "react-router-dom"

import { Button } from "../ui/atoms/Button"
import { Text } from "../ui/atoms/Text"

import Logo from "../assets/icons/Logo"

export function Header() {
  async function handleShare() {
    await navigator.clipboard.writeText(window.location.href)
  }

  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo size={40} />

        <Text>Anotar me</Text>
      </LogoContainer>

      <NavigationContainer>
        <Button as={LinkButton} to="chats">
          Your chats
        </Button>

        <Button onClick={handleShare}>Compartilhar</Button>

        <Button as={LinkButton} to="/auth/login">
          Sua conta
        </Button>
      </NavigationContainer>
    </HeaderContainer>
  )
}

const LinkButton = styled(Link)``

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 4rem;
  min-height: 6.25rem;

  @media (max-width: 910px) {
    flex-direction: column;
    row-gap: 1rem;
    min-height: 3rem;
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
