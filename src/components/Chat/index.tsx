import styled from "styled-components"

import { useChat } from "./hooks/useChat"
import { useChats } from "./hooks/useChats"

import { Screen } from "../../ui/Screen"

import { ChatHeader } from "./components/ChatHeader"
import { ChatList } from "./components/ChatList"
import { ChatContent } from "./components/ChatContent"
import { CreateChatForm } from "./components/CreateChatForm"

export function Chat() {
  const {
    handleSendMessage,
    handleCreateChat,
    handleDeleteChat,
    handleArchiveChat,
    handleClearChat,
  } = useChats()

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

  const chatOpen = !!selectedChat

  const archiveChat = async (chatId: string) => {
    try {
      await handleArchiveChat(chatId)

      handleCloseChat()
    } catch {
      console.error("Error trying to archive chat")
    }
  }

  return (
    <ChatScreen>
      <ChatHeader
        chatId={chatId}
        profile={profile}
        selectChatData={selectedChatInfo}
        handleDeleteChat={handleDeleteChat}
        handleArchiveChat={archiveChat}
        handleClearChat={handleClearChat}
      />

      <ChatListContainer>
        <CreateChatForm
          chatOpen={chatOpen}
          handleCreateChat={handleCreateChat}
        />

        <ChatList
          handleSelectChat={handleSelectChat}
          chats={reversedChats}
          chat={selectedChat}
          handleCloseChat={handleCloseChat}
          handleSendMessage={handleSendMessage}
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
