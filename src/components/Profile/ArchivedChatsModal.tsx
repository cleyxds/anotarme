import { useCallback, useEffect, useRef, useState } from "react"

import styled from "styled-components"

import { Dialog } from "@headlessui/react"

import { useChat } from "../Chat/hooks/useChat"
import { useArchivedChats } from "./hooks/useArchivedChats"

import { baseModal } from "../../ui/base"
import { Text } from "../../ui/atoms/Text"
import { Button } from "../../ui/atoms/Button"

import { ChatList } from "../Chat/components/ChatList"
import { ChatMessage } from "../Chat/components/ChatContent"
import { ChatMessages } from "../Chat/components/ChatMessages"
import { Backdrop, ScrollablePanel, Wrapper } from "../Modal/components"

import { archiveChatById } from "../../utils/chat"

import { Archive, ArrowLeft } from "../../assets/icons"

type ArchivedChatsModalProps = {
  userId: string
}
export function ArchivedChatsModal({ userId }: ArchivedChatsModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const archivedChats = useArchivedChats(userId)

  const { selectedChat, handleCloseChat, handleSelectChat } = useChat(true)

  const handleArchiveChat = useCallback(
    async (chatId: string) => {
      if (!chatId) return

      const archiveChat = {
        userId,
        chatId,
        archived: false,
      }

      await archiveChatById(archiveChat)
    },
    [userId]
  )

  const chatListProps = {
    list: archivedChats,
    selectedChat,
    handleSelectChat,
    handleCloseChat,
    handleArchiveChat,
  }

  return (
    <>
      <Button onClick={handleOpen}>Ver chats arquivados</Button>

      <Dialog open={isOpen} onClose={handleClose} className="fixed z-50">
        <Backdrop />

        <ScrollablePanel>
          <Wrapper>
            <Dialog.Panel>
              <ArchivedChatsContainer>
                <ArchivedChatsList {...chatListProps} />
              </ArchivedChatsContainer>
            </Dialog.Panel>
          </Wrapper>
        </ScrollablePanel>
      </Dialog>
    </>
  )
}

const ArchivedChatsContainer = styled.div`
  ${baseModal}

  > div {
    width: 100%;
    overflow-y: scroll;
    padding: 0 1rem 0 0;

    > div {
      width: 100%;
    }
  }
`

function ArchivedChatsSkeleton() {
  return (
    <Text size="small" color="WHITE-I">
      No archived chats
    </Text>
  )
}

type ArchivedChatsListProps = {
  list: ChatType[]
  selectedChat: ChatType | undefined
  handleSelectChat: (chatIdSelected: string) => void
  handleCloseChat: () => void
  handleArchiveChat: (chatId: string) => void
}
export function ArchivedChatsList({
  list,
  selectedChat,
  handleSelectChat,
  handleArchiveChat,
  handleCloseChat,
}: ArchivedChatsListProps) {
  const chatAreaRef = useRef<HTMLDivElement>(null)
  const chatInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => handleCloseChat()
  }, [])

  if (!list?.length) return <ArchivedChatsSkeleton />

  if (selectedChat) {
    const CHAT_ID = selectedChat.id
    const CHAT_NAME = selectedChat?.name
    const CHAT_IMAGE = selectedChat?.image
    const CHAT_IMAGE_ALT = `${CHAT_ID} image`
    const MEMBERS_LENGTH = selectedChat?.members?.length

    return (
      <OpenedChatContainer>
        <OpenedChatHeader>
          <button onClick={handleCloseChat}>
            <ArrowLeft size="1.5rem" color="var(--WHITE-I)" />
          </button>

          <OpenedChatImage src={CHAT_IMAGE} alt={CHAT_IMAGE_ALT} />

          <ChatMessage
            size="small"
            type="SUISSETINTLBOLD"
            color="WHITE-I"
            as="h2"
          >
            {CHAT_NAME}
          </ChatMessage>

          {MEMBERS_LENGTH && (
            <ChatMessage
              size="smallest"
              type="SUISSETINTLMEDIUM"
              color="WHITE-I"
              as="h3"
            >
              {MEMBERS_LENGTH} member ({MEMBERS_LENGTH} online)
            </ChatMessage>
          )}

          <Button
            title="Desarquivar chat"
            onClick={() => handleArchiveChat?.(CHAT_ID)}
          >
            <Archive />
          </Button>
        </OpenedChatHeader>

        <OpenedChatArea>
          <ChatMessages chat={selectedChat} />
        </OpenedChatArea>

        <OpenedChatSendMessageForm />
      </OpenedChatContainer>
    )
  }

  return (
    <ChatList
      chat={selectedChat}
      chats={list}
      chatAreaRef={chatAreaRef}
      chatInputRef={chatInputRef}
      handleSelectChat={handleSelectChat}
      handleCloseChat={() => {}}
      handleSendMessage={async () => {}}
    />
  )
}

const OpenedChatContainer = styled.div`
  ${baseModal}

  width: 434.688px !important;
  height: 414px !important;
  justify-content: unset !important ;
  align-items: unset !important;
  padding: 0 !important;

  @media (width < 668px) {
    width: 100% !important;
  }
`

const OpenedChatHeader = styled.section`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  overflow: hidden;
`

const OpenedChatImage = styled.img`
  width: 3.5rem;
  height: 100%;
  border-radius: 9999px;
  border: 1px solid var(--GREEN-IX);
  object-fit: cover;

  @media (width < 668px) {
    display: none;
  }
`

const OpenedChatArea = styled.div`
  flex: 1;
`

const OpenedChatSendMessageForm = styled.form`
  display: none;
  height: 56px;
`
