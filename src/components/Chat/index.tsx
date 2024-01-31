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
    chatInputRef,
    handleCloseChat,
    profile,
    selectedChatInfo,
    reversedChats,
  } = useChat()

  return (
    <ChatScreen>
      <ChatHeader
        chatId={chatId}
        profile={profile}
        selectChatData={selectedChatInfo}
      />

      <ChatListContainer>
        <CreateChatForm handleCreateChat={handleCreateChat} />

        <ChatList
          handleSelectChat={handleSelectChat}
          chats={reversedChats}
          chat={selectedChat}
          handleCloseChat={handleCloseChat}
          handleSendMessage={handleSendMessage}
          chatId={chatId}
        />

        <ChatContent
          chat={selectedChat}
          chatInputRef={chatInputRef}
          handleCloseChat={handleCloseChat}
          handleSendMessage={handleSendMessage}
          chatId={chatId}
        />
      </ChatListContainer>
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
    <CreateChatFormContainer
      className="absolute top-0 z-50 flex items-center gap-4"
      onSubmit={handleFormSubmit}
    >
      <Input id="chat-name" required name="chat-name" placeholder="Chat name" />

      <Button type="submit">Create chat</Button>
    </CreateChatFormContainer>
  )
}

const ChatScreen = styled(Screen)`
  height: 100dvh;
  width: 100dvw;
  padding: 2rem 2.5625rem 0;
  background-color: var(--WHITE-I);
  gap: 1.5rem;

  @media (max-width: 668px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`

const ChatListContainer = styled.div`
  position: relative;
  display: flex;
  height: 83%;
`

const CreateChatFormContainer = styled.form`
  position: absolute;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1406px) {
    display: none;
  }
`
