import { ButtonHTMLAttributes, Fragment, useState } from "react"

import styled from "styled-components"

import { Menu } from "@headlessui/react"

import { Button } from "../../../ui/atoms/Button"
import { Text } from "../../../ui/atoms/Text"

import { ChatHeaderProps } from "./ChatHeader"
import { ChatProfileImage } from "./ChatProfile"
import { ChatMessage } from "./ChatContent"
import { DeleteChat } from "./DeleteChat"
import { AddChatMember } from "./AddChatMember"

import { Broom, Archive } from "../../../assets/icons"

import DEFAULT_IMAGE_SRC from "../../../assets/images/DefaultUserImage.png"

type ChatIndicatorProps = {
  handleArchiveChat: (chatId: string) => void
  handleClearChat: (chatId: string) => void
  handleAddMembers?: (chatId: string, members: string[]) => void
} & ChatHeaderProps

export function ChatIndicator({
  chatId,
  handleDeleteChat,
  selectChatData,
  handleArchiveChat,
  handleAddMembers,
  handleClearChat,
}: ChatIndicatorProps) {
  if (!chatId) return null

  const CHAT_NAME = selectChatData?.name
  const CHAT_IMAGE = selectChatData?.image
  const MEMBERS_LENGTH = selectChatData?.members?.length

  const MEMBERS_TEXT = MEMBERS_LENGTH! > 1 ? "membros" : "membro"

  return (
    <ChatIndicatorContainer>
      <ChatProfileImage
        src={CHAT_IMAGE ?? DEFAULT_IMAGE_SRC}
        alt="Chat image"
      />

      <ChatNameContainer>
        <ChatOptions
          render={
            <Fragment>
              <AddChatMember
                chatName={CHAT_NAME}
                chatId={chatId}
                handleAddMembers={handleAddMembers}
              />

              <TwoOptionButton
                message="Arquivar chat?"
                onConfirm={() => handleArchiveChat(chatId)}
                render={(toggleConfirm) => (
                  <Button onClick={toggleConfirm}>
                    <Archive /> Arquivar chat
                  </Button>
                )}
              />

              <TwoOptionButton
                message="Limpar chat?"
                onConfirm={() => handleClearChat(chatId)}
                render={(toggleConfirm) => (
                  <Button onClick={toggleConfirm}>
                    <Broom /> Limpar chat
                  </Button>
                )}
              />

              <DeleteChat
                chatName={CHAT_NAME}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
              />
            </Fragment>
          }
        >
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
              {MEMBERS_LENGTH} {MEMBERS_TEXT}
            </ChatMessage>
          )}
        </ChatOptions>
      </ChatNameContainer>
    </ChatIndicatorContainer>
  )
}

const ChatIndicatorContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 1rem 2rem;
  gap: 1rem;
  align-items: center;

  @media (max-width: 668px) {
    display: none;
  }
`

const ChatNameContainer = styled.div`
  display: flex;
  flex-direction: column;
`

type ChatOptionsProps = {
  render?: React.ReactNode
  children: React.ReactNode
}
export function ChatOptions({ render, children }: ChatOptionsProps) {
  return (
    <Menu>
      <Menu.Button className="flex flex-col">{children}</Menu.Button>

      <OptionsContainer>{render}</OptionsContainer>
    </Menu>
  )
}

const OptionsContainer = styled(Menu.Items)`
  z-index: 10;
  position: absolute;
  background-color: var(--BLACK-I);
  border-radius: 10px;
  padding: 0.5rem;
  top: 6rem;
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (width < 668px) {
    top: 8.25rem;
    right: 1rem;
    left: 1rem;
  }
`

type TwoOptionButtonProps = {
  render: (toggleConfirm: () => void) => JSX.Element
  message: string
  onConfirm: React.MouseEventHandler | undefined
} & ButtonHTMLAttributes<unknown>
function TwoOptionButton({ render, message, onConfirm }: TwoOptionButtonProps) {
  const [confirm, setConfirm] = useState(false)

  const toggleConfirm = () => setConfirm((state) => !state)

  return (
    <>
      {!confirm && render(toggleConfirm)}

      {confirm && (
        <div className="flex gap-1 flex-col border-[var(--WHITE-I)] border-[0.8px] border-solid p-1">
          <Text size="smallest" type="SUISSETINTLMEDIUM" color="WHITE-I">
            {message}
          </Text>

          <div className="flex gap-1">
            <YesButton className="flex-1" onClick={onConfirm}>
              Sim
            </YesButton>

            <Button className="flex-1" onClick={toggleConfirm}>
              Não
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

const YesButton = styled(Button)`
  background-color: var(--RED-I);
  color: var(--WHITE-I);

  &:hover {
    background-color: var(--RED-I);
    color: var(--WHITE-I);
    opacity: 0.8;
  }
`
