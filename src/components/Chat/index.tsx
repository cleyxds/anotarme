import styled from "styled-components"

import { useChat } from "./hooks/useChat"

import { Screen } from "../../ui/Screen"

import { ChatHeader } from "./components/ChatHeader"
import { ChatList } from "./components/ChatList"
import { ChatContent } from "./components/ChatContent"

export function Chat() {
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

      <div className="flex h-[83%]">
        <ChatList handleSelectChat={handleSelectChat} chats={chats} />

        <ChatContent
          chat={selectedChat}
          chatInputRef={chatInputRef}
          handleCloseChat={handleCloseChat}
          chatId={chatId}
        />
      </div>
    </ChatScreen>
  )
}

const ChatScreen = styled(Screen)`
  height: 100dvh;
  width: 100dvw;
  padding: 2rem 2.5625rem 0;
  background-color: var(--WHITE-I);
  gap: 1.5rem;
`
