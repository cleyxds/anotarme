import styled from "styled-components"

import { useMediaQuery } from "usehooks-ts"

import { baseSuissetIntlRegular } from "../../../ui/base"

import { ChatMessage } from "./ChatContent"
import { MobileChatList } from "./MobileChatList"
import { ChatListSkeleton } from "./ChatListSkeleton"

type ChatListProps = {
  chats?: ChatType[]
  chat?: ChatType
  chatInputRef: React.RefObject<HTMLInputElement>
  chatAreaRef: React.RefObject<HTMLDivElement>
  handleSelectChat: (chatId: string) => void
  handleSendMessage: (chatId: string, message: string) => Promise<void>
  handleCloseChat: () => void
}

export const ChatListContainer = styled.div`
  width: 33.53%;
  height: 100%;
  padding-right: 2rem;
  padding-bottom: 1rem;
  overflow-y: scroll;

  @media (max-width: 1336px) {
    width: 33.63%;
  }

  @media (width < 668px) {
    width: 100%;
    padding-right: 0 !important;
    overflow-y: auto;
  }

  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 9999px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: var(--BLACK-II);
    border-radius: 9999px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: var(--GREEN-IX);
    border-radius: 9999px;
  }
`

export function ChatList({
  chat,
  chats,
  chatAreaRef,
  chatInputRef,
  handleSelectChat,
  handleSendMessage,
  handleCloseChat,
}: ChatListProps) {
  const NO_CHATS = !chats?.length

  const isMobile = useMediaQuery("(width <= 668px)")

  if (NO_CHATS) return <ChatListSkeleton />

  const foundMessages = !!chat

  if (foundMessages && isMobile) {
    return (
      <MobileChatList
        chat={chat}
        chatAreaRef={chatAreaRef}
        chatInputRef={chatInputRef}
        handleCloseChat={handleCloseChat}
        handleSendMessage={handleSendMessage}
      />
    )
  }

  return (
    <ChatListContainer className="pt-10 space-y-7">
      {chats.map((chat) => {
        const CHAT_ID = chat.identifier
        const CHAT_IMAGE_ALT = `${CHAT_ID} image`
        const CHAT_NAME = chat.name
        const CHAT_MESSAGES = chat.messages
        const CHAT_IMAGE = chat.image

        const HAS_LASTMESSAGE = !!CHAT_MESSAGES?.length
        const LAST_MESSAGE = CHAT_MESSAGES?.[chat.messages.length - 1]?.text

        return (
          <ChatCardContainer
            onClick={() => handleSelectChat(CHAT_ID)}
            key={CHAT_ID}
          >
            <ChatImage src={CHAT_IMAGE} alt={CHAT_IMAGE_ALT} />

            <div className="w-[80%]">
              <ChatName
                size="small"
                type="SUISSETINTLREGULAR"
                color="GREEN-VI"
                as="h2"
              >
                {CHAT_NAME}
              </ChatName>

              {HAS_LASTMESSAGE && (
                <LastMessage
                  size="small"
                  type="SUISSETINTLMEDIUM"
                  color="GREEN-VI"
                  as="h3"
                >
                  {LAST_MESSAGE}
                </LastMessage>
              )}
            </div>
          </ChatCardContainer>
        )
      })}
    </ChatListContainer>
  )
}

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
  object-fit: cover;
`

const ChatName = styled(ChatMessage)`
  color: var(--GREEN-IX);
  ${baseSuissetIntlRegular}
`

const LastMessage = styled(ChatMessage)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--WHITE-I);
  font-weight: 400;
`
