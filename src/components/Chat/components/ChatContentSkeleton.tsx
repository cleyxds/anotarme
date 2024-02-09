import { StyledChatMessage } from "./StyledChatMessage"

export function ChatContentSkeleton() {
  return (
    <div className="flex flex-1 justify-center items-center">
      <StyledChatMessage
        size="small"
        type="SUISSETINTLREGULAR"
        color="GREEN-VI"
        as="h2"
      >
        Escolha um chat
      </StyledChatMessage>
    </div>
  )
}
