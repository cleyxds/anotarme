import styled from "styled-components"

import { useRecoilValue } from "recoil"
import { AuthAtom } from "../../../atoms/Auth"

import { Text } from "../../../ui/atoms/Text"
import { ChatMessage } from "./ChatContent"
import { ChatHeaderProps } from "./ChatHeader"
import { LinkButton } from "../../LinkButton"

import Logo from "../../../assets/icons/Logo"
import UserIcon from "../../../assets/icons/UserIcon"

export const ChatProfileImage = styled.img`
  border-radius: 9999px;
  border: 1px solid var(--GREEN-IX);
  width: 3rem;
  height: 3rem;
  object-fit: cover;
`

export function ChatProfile({ profile }: ChatHeaderProps) {
  const auth = useRecoilValue(AuthAtom)

  const SHOULD_LOGIN = !auth?.isAuthenticated

  const PROFILE_ID = profile?.id
  const PROFILE_IMAGE = profile?.image
  const PROFILE_LINK = `/profile/${PROFILE_ID}`

  return (
    <ChatProfileContainer>
      <ChatProfileLink href="/">
        <Logo />

        <ChatTitle type="V2">Chatao</ChatTitle>
      </ChatProfileLink>

      {PROFILE_ID && (
        <ChatProfileMe href={PROFILE_LINK}>
          <div className="gap-1 flex items-center -rotate-90">
            <ChatMessage size="smallest" type="V1" color="GREEN-VI" as="span">
              Perfil
            </ChatMessage>

            <UserIcon size={16} />
          </div>

          <ChatProfileImage src={PROFILE_IMAGE} alt="Profile image" />
        </ChatProfileMe>
      )}

      {SHOULD_LOGIN && <LoginButton to="/auth/login">Login!</LoginButton>}
    </ChatProfileContainer>
  )
}

const LoginButton = styled(LinkButton)`
  height: fit-content;
  align-self: center;
`

const ChatProfileContainer = styled.nav`
  display: flex;
  padding: 1rem 2rem;
  width: 33%;

  @media (max-width: 668px) {
    width: 100%;
  }
`

const ChatProfileLink = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
`

const ChatTitle = styled(Text)`
  align-self: center;
  font-size: 1.25rem;

  @media (max-width: 1153px) {
    font-size: 1rem;
  }
`

const ChatProfileMe = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1071px) {
    display: none;
  }
`
