import { Text } from "../../../ui/atoms/Text"

import { ChatListContainer } from "./ChatList"

export function ChatListSkeleton() {
  return (
    <ChatListContainer className="space-y-7 flex justify-center items-center">
      <Text size="small" type="V2" color="GREEN-VI" as="h2">
        No Chats
      </Text>
    </ChatListContainer>
  )
}
