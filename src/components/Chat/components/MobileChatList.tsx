import { useCallback, useRef } from "react"

import styled from "styled-components"

import { ChatInput, ChatMessage, CloseChat, SendButton } from "./ChatContent"

import { formatDistanceToNow } from "date-fns"

import { ChatType } from "../../../types/chat"

type MobileChatListProps = {
  chat: ChatType
  handleCloseChat: () => void
  chatId: string
  handleSendMessage: (chatId: string, message: string) => void
}

export function MobileChatList({
  chat,
  handleCloseChat,
  chatId,
  handleSendMessage,
}: MobileChatListProps) {
  const chatInputRef = useRef<HTMLInputElement>(null)

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
  display: flex;
  flex: 1;
  flex-direction: column;

  @media (screenmax-width: 668px) {
    display: none;
  }
`
