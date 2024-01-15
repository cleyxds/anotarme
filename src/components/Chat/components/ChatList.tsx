import styled from "styled-components"

import { ChatType } from "../../../types/chat"
import { ChatMessage } from "./ChatContent"

type ChatListProps = {
  chats?: ChatType[]
  handleSelectChat: (chatId: string) => void
}

export function ChatList({ chats = [], handleSelectChat }: ChatListProps) {
  return (
    <ChatListContainer>
      {chats.map((chat) => {
        const CHAT_ID = chat.id
        const CHAT_IMAGE_ALT = `${CHAT_ID} image`
        const CHAT_NAME = chat.name
        const LAST_MESSAGE = chat.messages[chat.messages.length - 1].text
        const CHAT_IMAGE = chat.user.image

        return (
          <ChatCardContainer
            onClick={() => handleSelectChat(CHAT_ID)}
            key={chat.id}
          >
            <ChatImage src={CHAT_IMAGE} alt={CHAT_IMAGE_ALT} />

            <div className="w-[80%]">
              <ChatName size="small" type="V2" color="GREEN-VI" as="h2">
                {CHAT_NAME}
              </ChatName>

              <LastMessage size="small" type="V2" color="GREEN-VI" as="h3">
                {LAST_MESSAGE}
              </LastMessage>
            </div>
          </ChatCardContainer>
        )
      })}
    </ChatListContainer>
  )
}

const ChatListContainer = styled.aside`
  width: 33.53%;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.6875rem;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 9999px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: var(--WHITE-I);
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: var(--GREEN-IX);
    border-radius: 9999px;
  }
`

const ChatCardContainer = styled.div`
  position: relative;
  height: 83px;
  background-color: var(--BLACK-II);
  display: flex;
  align-items: center;
  padding: 0.625rem calc(2.5rem + 0.875rem) 0.625rem 0.625rem;
  gap: 1rem;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
`

const ChatImage = styled.img`
  border-radius: 9999px;
  width: 3.8125rem;
  height: 3.8125rem;
`

const ChatName = styled(ChatMessage)`
  color: var(--GREEN-IX);
`

const LastMessage = styled(ChatMessage)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--WHITE-I);
`
