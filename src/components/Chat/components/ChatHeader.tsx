import styled from "styled-components"

import { ChatProfile } from "./ChatProfile"
import { ChatIndicator } from "./ChatIndicator"

import { ChatIdProps } from "../../../types/chat"

type SelectedChatInfo = {
  name: string | undefined
  image: string | undefined
  members?: string[] | undefined
}

type ProfileDataProps = {
  id: string | undefined
  image: string | undefined
}

export type ChatHeaderProps = {
  handleDeleteChat?: (chatId: string) => void
  handleArchiveChat?: (chatId: string) => void
  handleClearChat?: (chatId: string) => void
  handleAddMembers?: () => void
  selectChatData?: SelectedChatInfo
  profile?: ProfileDataProps | null
} & ChatIdProps

export function ChatHeader({
  chatId,
  profile,
  selectChatData,
  handleDeleteChat,
  handleClearChat,
  handleAddMembers,
  handleArchiveChat,
}: ChatHeaderProps) {
  return (
    <ChatProfileContainer>
      <ChatProfile
        chatId={chatId}
        handleDeleteChat={handleDeleteChat}
        handleArchiveChat={handleArchiveChat}
        handleClearChat={handleClearChat}
        selectChatData={selectChatData}
        profile={profile}
      />

      <ChatProfileVerticalBar />

      <ChatIndicator
        chatId={chatId}
        selectChatData={selectChatData}
        handleDeleteChat={handleDeleteChat}
        handleArchiveChat={handleArchiveChat!}
        handleAddMembers={handleAddMembers!}
        handleClearChat={handleClearChat!}
      />
    </ChatProfileContainer>
  )
}

const ChatProfileContainer = styled.div`
  display: flex;
  border: 3px solid var(--GREEN-VI);
  border-radius: 10px;
`

const ChatProfileVerticalBar = styled.div`
  height: 100%;
  width: 7px;
  background-color: var(--GREEN-IX);

  @media (max-width: 1152px) {
    display: none;
  }
`
