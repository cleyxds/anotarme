import { Fragment } from "react"

import styled from "styled-components"

import { useRecoilValue } from "recoil"
import { AuthAtom } from "../../../atoms/Auth"

import { Text } from "../../../ui/atoms/Text"
import { Button } from "../../../ui/atoms/Button"

import { ChatMessage } from "./ChatContent"
import { ChatHeaderProps } from "./ChatHeader"
import { LinkButton } from "../../LinkButton"
import { OptimizedImage } from "../../OptimizedImage"
import { ChatOptions } from "./ChatIndicator"

import { UserCircle, Logo, Archive, Broom, Trash } from "../../../assets/icons"

export const ChatProfileImage = styled(OptimizedImage)`
  border-radius: 9999px;
  border: 1px solid var(--GREEN-IX);
  width: 3rem;
  height: 3rem;
  object-fit: cover;
`

export function ChatProfile({
  chatId,
  profile,
  selectChatData,
  handleDeleteChat,
  handleArchiveChat,
  handleClearChat,
}: ChatHeaderProps) {
  const auth = useRecoilValue(AuthAtom)

  const SHOULD_LOGIN = !auth?.isAuthenticated

  const PROFILE_ID = profile?.id
  const PROFILE_IMAGE = profile?.image
  const PROFILE_LINK = `/profile/${PROFILE_ID}`

  const CHAT_NAME = selectChatData?.name
  const CHAT_IMAGE = selectChatData?.image
  const MEMBERS_LENGTH = selectChatData?.members?.length
  const NO_CHAT = !CHAT_NAME

  return (
    <ChatProfileContainer>
      <ChatProfileLink href="/">
        <Logo />

        <ChatTitle type="V2">Chatao</ChatTitle>
      </ChatProfileLink>

      {!NO_CHAT && (
        <ChatOptions
          render={
            <Fragment>
              <Button onClick={() => handleArchiveChat?.(chatId!)}>
                <Archive /> Arquivar chat
              </Button>
              <Button onClick={() => handleClearChat?.(chatId!)}>
                <Broom /> Limpar chat
              </Button>
              <Button onClick={() => handleDeleteChat?.(chatId!)}>
                <Trash /> Deletar chat
              </Button>
            </Fragment>
          }
        >
          <ChatIndicatorMobile>
            <ChatImage src={CHAT_IMAGE} alt={`Chat: ${CHAT_NAME} Image`} />

            <ChatDataWrapper>
              <ChatMessage
                size="small"
                type="SUISSETINTLBOLD"
                color="GREEN-VI"
                as="h2"
              >
                {CHAT_NAME}
              </ChatMessage>

              {MEMBERS_LENGTH && (
                <ChatMessage
                  size="smallest"
                  type="SUISSETINTLMEDIUM"
                  color="GREEN-VI"
                  as="h3"
                >
                  {MEMBERS_LENGTH} member ({MEMBERS_LENGTH} online)
                </ChatMessage>
              )}
            </ChatDataWrapper>
          </ChatIndicatorMobile>
        </ChatOptions>
      )}

      {PROFILE_ID && (
        <ChatProfileMe href={PROFILE_LINK}>
          <div className="gap-1 flex items-center -rotate-90">
            <ChatMessage size="smallest" type="V1" color="GREEN-VI" as="span">
              Perfil
            </ChatMessage>

            <UserCircle size={16} />
          </div>

          <ChatProfileImage src={PROFILE_IMAGE} alt="Profile image" />
        </ChatProfileMe>
      )}

      {SHOULD_LOGIN && <LoginButton to="/auth/login">Login</LoginButton>}
    </ChatProfileContainer>
  )
}

const LoginButton = styled(LinkButton)`
  align-self: center;
`

const ChatProfileContainer = styled.nav`
  display: flex;
  padding: 1rem 2rem;
  width: 33%;

  @media (max-width: 668px) {
    width: 100%;
    align-items: center;
    gap: 1rem;
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

const ChatIndicatorMobile = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (width > 668px) {
    display: none;
  }
`

const ChatImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  border: 1px solid var(--GREEN-IX);
  object-fit: cover;
`

const ChatDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: flex-start;
`
