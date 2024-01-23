import { useCallback } from "react"
import styled from "styled-components"

import { useChat } from "./hooks/useChat"
import { useChats } from "./hooks/useChats"

import { Button } from "../../ui/atoms/Button"
import { Screen } from "../../ui/Screen"
import { Input } from "../../ui/atoms/Input"

import { ChatHeader } from "./components/ChatHeader"
import { ChatList } from "./components/ChatList"
import { ChatContent } from "./components/ChatContent"

export function Chat() {
  const { handleSendMessage, handleCreateChat } = useChats()

  const {
    chatId,
    handleSelectChat,
    selectedChat,
    chats,
    chatInputRef,
    handleCloseChat,
    profile,
    selectedChatInfo,
  } = useChat()

  return (
    <ChatScreen>
      <ChatHeader
        chatId={chatId}
        profile={profile}
        selectChatData={selectedChatInfo}
      />

      <div className="flex h-[83%] relative">
        <CreateChatForm handleCreateChat={handleCreateChat} />

        <ChatList handleSelectChat={handleSelectChat} chats={chats} />

        <ChatContent
          chat={selectedChat}
          chatInputRef={chatInputRef}
          handleCloseChat={handleCloseChat}
          handleSendMessage={handleSendMessage}
          chatId={chatId}
        />
      </div>
    </ChatScreen>
  )
}

function CreateChatForm({
  handleCreateChat,
}: {
  handleCreateChat: (chatName: string) => void
}) {
  const handleFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const chatName = event.currentTarget["chat-name"].value

      if (!chatName) return

      handleCreateChat(chatName)

      event.currentTarget["chat-name"].value = ""
    },
    [handleCreateChat]
  )

  return (
    <form
      className="absolute top-0 z-50 flex items-center gap-4"
      onSubmit={handleFormSubmit}
    >
      <Input id="chat-name" required name="chat-name" placeholder="Chat name" />

      <Button type="submit">Create chat</Button>
    </form>
  )
}

const ChatScreen = styled(Screen)`
  height: 100dvh;
  width: 100dvw;
  padding: 2rem 2.5625rem 0;
  background-color: var(--WHITE-I);
  gap: 1.5rem;
`
