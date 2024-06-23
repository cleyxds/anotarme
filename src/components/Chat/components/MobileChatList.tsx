import { useCallback } from "react"

import styled from "styled-components"

import { formatDistanceToNow } from "date-fns"

import {
  ChatInput,
  ChatMessage,
  CloseChat,
  MessageLinkText,
  SendButton,
} from "./ChatContent"

import { hasLink } from "../utils/linkHandler"

type MobileChatListProps = {
  chat: ChatType
  chatInputRef: React.RefObject<HTMLInputElement>
  chatAreaRef: React.RefObject<HTMLDivElement>
  handleCloseChat: () => void
  handleSendMessage: (chatId: string, message: string) => Promise<void>
}

export function MobileChatList({
  chat,
  chatInputRef,
  chatAreaRef,
  handleCloseChat,
  handleSendMessage,
}: MobileChatListProps) {
  const chatId = chat.id

  const handleSendChat = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault()

        const chatInput = chatInputRef.current?.value

        if (!chatInput || !chatId) return

        await handleSendMessage(chatId, chatInput)

        chatInputRef.current!.value = ""
      } catch (error) {
        throw new Error("Something went wrong")
      }
    },
    [chatId, handleSendMessage]
  )

  return (
    <ContentContainer>
      <CloseChat onClick={handleCloseChat}>Fechar</CloseChat>

      <div
        ref={chatAreaRef}
        className="flex flex-1 flex-col text-[var(--BLACK-I)] pr-[12%] mb-4 overflow-y-scroll"
      >
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
                {isLink ? MessageLinkText(message) : MESSAGE_TEXT}
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
  display: flex;
  flex: 1;
  flex-direction: column;

  @media (screenmax-width: 668px) {
    display: none;
  }
`
