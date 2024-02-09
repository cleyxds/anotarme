import styled from "styled-components"

import { formatDistanceToNow } from "date-fns"

import { baseSuissetIntlRegular } from "../../../ui/base"
import { Input } from "../../../ui/atoms/Input"
import { Button } from "../../../ui/atoms/Button"
import { Text } from "../../../ui/atoms/Text"
import { ChatContentSkeleton } from "./ChatContentSkeleton"

import { ChatIdProps, ChatType } from "../../../types/chat"

type ChatContentProps = {
  chatInputRef: React.RefObject<HTMLInputElement>
  chat?: ChatType
  handleCloseChat: () => void
  handleSendMessage: (chatId: string, message: string) => Promise<void>
} & ChatIdProps

export const ChatMessage = styled(Text)``

export const ChatInput = styled(Input)`
  border: none;
  color: var(--WHITE-I);
  ${baseSuissetIntlRegular}
  font-weight: 400;
  letter-spacing: 2px;
  height: 3rem;
  width: 100%;
  background-color: var(--BLACK-I);
`

export const SendButton = styled(Button)`
  height: max-content;
`

export const CloseChat = styled(Button)`
  position: absolute;
  right: 0;
  top: 0;

  &:hover {
    background-color: var(--RED-I);
    color: var(--WHITE-I);
  }
`

export function ChatContent({
  chat,
  chatInputRef,
  handleCloseChat,
  handleSendMessage,
  chatId,
}: ChatContentProps) {
  async function handleSendChat(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()

      const chatInput = chatInputRef.current?.value

      if (!chatInput || !chatId) return

      await handleSendMessage(chatId, chatInput)

      chatInputRef.current!.value = ""
    } catch (error) {
      throw new Error("Something went wrong")
    }
  }

  if (!chatId) {
    return (
      <ContentContainer>
        <ChatContentSkeleton />
      </ContentContainer>
    )
  }

  return (
    <ContentContainer>
      <CloseChat onClick={handleCloseChat}>Fechar</CloseChat>

      <div className="flex flex-1 flex-col text-[var(--BLACK-I)] pr-[12%]">
        {chat?.messages.map((message) => {
          const MESSAGE_ID = message.id
          const MESSAGE_TIMESTAMP = formatDistanceToNow(
            new Date(message.timestamp)
          )

          return (
            <div key={MESSAGE_ID}>
              <ChatMessage
                size="small"
                type="SFPROBOLD"
                color="GREEN-V"
                as="span"
              >
                {MESSAGE_TIMESTAMP} -
              </ChatMessage>{" "}
              <ChatMessage size="small" type="SFPROMEDIUM" as="span">
                {message.text}
              </ChatMessage>
            </div>
          )
        })}
      </div>

      <form
        className="flex items-center text-[var(--BLACK-I)] gap-4"
        onSubmit={handleSendChat}
      >
        <ChatInput
          id="chat-input"
          name="chat-input"
          placeholder="Jot something down"
          ref={chatInputRef}
        />

        <SendButton type="submit">Enviar</SendButton>
      </form>
    </ContentContainer>
  )
}

const ContentContainer = styled.div`
  position: relative;
  padding-left: calc(2rem - 8px);
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-bottom: 1rem;

  @media (max-width: 668px) {
    display: none;
  }
`
