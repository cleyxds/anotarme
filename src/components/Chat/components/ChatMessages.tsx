import { formatDistanceToNow } from "date-fns"

import { ChatMessage, MESSAGE_TEXT_LINK } from "./ChatContent"

import { hasLink } from "../utils/linkHandler"

type ChatMessagesProps = {
  chat: ChatType | undefined
}
export function ChatMessages({ chat }: ChatMessagesProps) {
  return chat?.messages.map((message) => {
    const MESSAGE_TEXT = message.text
    const MESSAGE_TIMESTAMP = formatDistanceToNow(new Date(message.timestamp))

    const isLink = hasLink(MESSAGE_TEXT)

    return (
      <div key={message.timestamp}>
        <ChatMessage size="small" type="SFPROBOLD" color="GREEN-V" as="span">
          {MESSAGE_TIMESTAMP} -
        </ChatMessage>{" "}
        <ChatMessage size="small" type="SFPROMEDIUM" as="span">
          {isLink ? MESSAGE_TEXT_LINK(MESSAGE_TEXT) : MESSAGE_TEXT}
        </ChatMessage>
      </div>
    )
  })
}
