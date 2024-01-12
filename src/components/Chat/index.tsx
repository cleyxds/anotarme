import { useEffect, useRef } from "react"

import styled from "styled-components"

import { Screen } from "../../ui/Screen"
import { Text } from "../../ui/atoms/Text"
import { Input } from "../../ui/atoms/Input"

import { generateId } from "../../utils/generateId"

export function Chat() {
  const chatId = generateId()

  const chatInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    chatInputRef.current?.focus()
  }, [])

  useEffect(() => {
    document.title = `Anotar me | Chat: ${chatId}`
  }, [chatId])

  async function broadcastMessage(message: string) {
    console.log("broadcasting message", message)

    return Promise.resolve(message)
  }

  async function handleSendChat(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()

      const chatInput = chatInputRef.current?.value

      if (!chatInput) return

      await broadcastMessage(chatInput)

      chatInputRef.current!.value = ""
    } catch (error) {
      throw new Error("Something went wrong")
    }
  }

  return (
    <ChatScreen>
      <ChatContainer>
        <ChatTitle>Chat: {chatId}</ChatTitle>

        <ChatContent />

        <ChatForm onSubmit={handleSendChat}>
          <ChatInput ref={chatInputRef} placeholder="Jot something down" />
        </ChatForm>
      </ChatContainer>
    </ChatScreen>
  )
}

const ChatScreen = styled(Screen)`
  height: 100dvh;
  width: 100dvw;
  padding: 0;
  border: 3px solid var(--BLACK-I);
`

const ChatTitle = styled(Text)`
  align-self: center;
`

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`

const ChatForm = styled.form`
  width: 100%;
`

const ChatInput = styled(Input)`
  border: none;
  font-family: "Hackernoon-v2";
  letter-spacing: 2px;
  height: 3rem;
  width: 100%;
`

const ChatContent = styled.div`
  flex: 1;
  padding: 1rem 1.5rem;
  overflow-y: auto;
  background-color: var(--GREEN-XI);
`
