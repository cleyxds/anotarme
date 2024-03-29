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
  selectChatData?: SelectedChatInfo
  profile?: ProfileDataProps | null
} & ChatIdProps

export function ChatHeader({
  chatId,
  profile,
  selectChatData,
  handleDeleteChat,
}: ChatHeaderProps) {
  return (
    <ChatProfileContainer>
      <ChatProfile profile={profile} />

      <ChatProfileVerticalBar />

      <ChatIndicator
        chatId={chatId}
        selectChatData={selectChatData}
        handleDeleteChat={handleDeleteChat}
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
