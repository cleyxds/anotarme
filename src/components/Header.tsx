import { useMemo } from "react"

import styled from "styled-components"

import { useAuthentication } from "../hooks/useAuthentication"
import { useRecoilValue } from "recoil"
import { AuthAtom } from "../atoms/Auth"

import { Button } from "../ui/atoms/Button"
import { Text } from "../ui/atoms/Text"

import { LinkButton } from "./LinkButton"

import Logo from "../assets/icons/Logo"
import { UserAtom } from "../atoms/User"

type HeaderProps = {
  preset?: "DEFAULT" | "PROFILE"
}

type Presets = {
  [key: string]: {
    logout: boolean | undefined
    account: boolean | undefined
  }
}

const shareFeatureDisabled = !window.isSecureContext

export function Header({ preset = "DEFAULT" }: HeaderProps) {
  const user = useRecoilValue(UserAtom)
  const userId = user?.id
  const auth = useRecoilValue(AuthAtom)
  const isAuthenticated = auth?.isAuthenticated

  const { logout } = useAuthentication()

  const PRESETS: Presets = useMemo(() => {
    return {
      DEFAULT: {
        logout: false,
        account: true,
      },
      PROFILE: {
        logout: auth?.isAuthenticated,
        account: false,
      },
    }
  }, [auth?.isAuthenticated])

  const selectedPreset = PRESETS[preset]
  const YOUR_ACCOUNT_LINK = isAuthenticated
    ? `/profile/${userId}`
    : "/auth/login"

  const handleShare = async () => {
    if (shareFeatureDisabled) {
      alert("This feature is only available in secure context")
      return
    }

    await navigator.clipboard.writeText(window.location.href)
  }

  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo size={40} />

        <Text>Anotar me</Text>
      </LogoContainer>

      <NavigationContainer>
        {selectedPreset.logout && (
          <LinkButton to="/" onClick={logout}>
            Sair
          </LinkButton>
        )}

        <LinkButton to="/chats">Seus chats</LinkButton>

        <Button onClick={handleShare}>Compartilhar</Button>

        {selectedPreset.account && (
          <LinkButton to={YOUR_ACCOUNT_LINK}>Sua conta</LinkButton>
        )}
      </NavigationContainer>
    </HeaderContainer>
  )
}

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
