import styled from "styled-components"

import { ChatHeaderProps } from "./ChatHeader"
import { ChatProfileImage } from "./ChatProfile"
import { ChatMessage } from "./ChatContent"

export function ChatIndicator({ chatId, selectChatData }: ChatHeaderProps) {
  if (!chatId) return null

  const CHAT_NAME = selectChatData?.name
  const CHAT_IMAGE = selectChatData?.image
  const MEMBERS_LENGTH = selectChatData?.members?.length

  return (
    <ChatIndicatorContainer>
      <ChatProfileImage src={CHAT_IMAGE} alt="Chat image" />

      <div className="flex flex-col">
        <ChatMessage size="small" type="V1" color="GREEN-VI" as="h4">
          {CHAT_NAME}
        </ChatMessage>

        {MEMBERS_LENGTH && (
          <ChatMessage size="smallest" type="V1" color="GREEN-VI" as="h4">
            {MEMBERS_LENGTH} member ({MEMBERS_LENGTH} online)
          </ChatMessage>
        )}
      </div>
    </ChatIndicatorContainer>
  )
}

const ChatIndicatorContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 1rem 2rem;
  gap: 1rem;
  align-items: center;

  @media (max-width: 668px) {
    display: none;
  }
`
