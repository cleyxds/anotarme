import { ChatListContainer } from "./ChatList"
import { StyledChatMessage } from "./StyledChatMessage"

export function ChatListSkeleton() {
  return (
    <ChatListContainer className="space-y-7 flex justify-center items-center">
      <StyledChatMessage
        size="small"
        type="SUISSETINTLREGULAR"
        color="GREEN-VI"
        as="h2"
      >
        Sem chats
      </StyledChatMessage>
    </ChatListContainer>
  )
}
