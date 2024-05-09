import styled from "styled-components"

import { formatDistanceToNow } from "date-fns"

import { baseSuissetIntlRegular } from "../../../ui/base"
import { Input } from "../../../ui/atoms/Input"
import { Button } from "../../../ui/atoms/Button"
import { Text } from "../../../ui/atoms/Text"
import { ChatContentSkeleton } from "./ChatContentSkeleton"

import { extractLink, hasLink } from "../utils/linkHandler"

import { ChatIdProps, ChatType } from "../../../types/chat"

type ChatContentProps = {
  chatInputRef: React.RefObject<HTMLInputElement>
  chat?: ChatType
  handleCloseChat: () => void
  handleSendMessage: (chatId: string, message: string) => Promise<void>
} & ChatIdProps

export const ChatMessage = styled(Text)`
  overflow-wrap: anywhere;
`
export const ChatMessageLink = styled(ChatMessage).attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  color: var(--GREEN-VII);
  text-decoration: underline;
  text-decoration-color: var(--GREEN-VII);

  @media (width > 768px) {
    &::after {
      content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="1rem" viewBox="0 -960 960 960" width="1rem" fill="rgb(40, 82, 48)"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/></svg>');
      position: relative;
      margin-left: 3px;
      top: 3px;
    }
  }
`

export const MESSAGE_TEXT_LINK = (MESSAGE_TEXT: string) => (
  <ChatMessageLink
    as="a"
    size="small"
    type="SFPROMEDIUM"
    href={extractLink(MESSAGE_TEXT)}
  >
    {MESSAGE_TEXT}
  </ChatMessageLink>
)

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
          const MESSAGE_TEXT = message.text
          const MESSAGE_TIMESTAMP = formatDistanceToNow(
            new Date(message.timestamp)
          )

          const isLink = hasLink(MESSAGE_TEXT)

          return (
            <div key={message.timestamp}>
              <ChatMessage
                size="small"
                type="SFPROBOLD"
                color="GREEN-V"
                as="span"
              >
                {MESSAGE_TIMESTAMP} -
              </ChatMessage>{" "}
              <ChatMessage size="small" type="SFPROMEDIUM" as="span">
                {isLink ? MESSAGE_TEXT_LINK(MESSAGE_TEXT) : MESSAGE_TEXT}
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
