import styled from "styled-components"

import { Input } from "../../../ui/atoms/Input"
import { Button } from "../../../ui/atoms/Button"

import { ChatIdProps, ChatType } from "../../../types/chat"
import { formatDistanceToNow } from "date-fns"
import { Text } from "../../../ui/atoms/Text"

type ChatContentProps = {
  chatInputRef: React.RefObject<HTMLInputElement>
  chat?: ChatType
  handleCloseChat: () => void
} & ChatIdProps

export const ChatMessage = styled(Text)``

export function ChatContent({
  chat,
  chatInputRef,
  handleCloseChat,
  chatId,
}: ChatContentProps) {
  async function broadcastMessage(chatId: string, message: string) {
    console.log(`broadcasting message to chatId ${chatId}`, message)

    return Promise.resolve(message)
  }

  async function handleSendChat(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()

      const chatInput = chatInputRef.current?.value

      if (!chatInput || !chatId) return

      await broadcastMessage(chatId, chatInput)

      chatInputRef.current!.value = ""
    } catch (error) {
      throw new Error("Something went wrong")
    }
  }

  if (!chatId) {
    return (
      <ContentContainer>
        <NoContent />
      </ContentContainer>
    )
  }

  return (
    <ContentContainer>
      <CloseChat onClick={handleCloseChat}>Close</CloseChat>

      <div className="flex flex-1 flex-col text-[var(--BLACK-I)] pr-[12%]">
        {chat?.messages.map((message) => {
          const MESSAGE_TIMESTAMP = formatDistanceToNow(
            new Date(message.timestamp)
          )

          return (
            <div key={message.id}>
              <ChatMessage
                size="small"
                type="SFPROBOLD"
                color="GREEN-V"
                as="span"
                capitalize
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
        <ChatInput placeholder="Jot something down" ref={chatInputRef} />

        <button type="submit">Send</button>
      </form>
    </ContentContainer>
  )
}

const ChatInput = styled(Input)`
  border: none;
  color: var(--WHITE-I);
  font-family: "Hackernoon-v2";
  letter-spacing: 2px;
  border-radius: 8px;
  height: 3rem;
  width: 100%;
  background-color: var(--BLACK-I);
`

const ContentContainer = styled.div`
  position: relative;
  padding-left: calc(2rem - 8px);
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-bottom: 1rem;
`

const CloseChat = styled(Button)`
  position: absolute;
  right: 0;
  top: 0;
`

function NoContent() {
  return (
    <div className="flex flex-1 justify-center items-center">
      <ChatMessage size="small" color="BLACK-I" type="V2" as="h1">
        No content just yet, choose a chat.
      </ChatMessage>
    </div>
  )
}
