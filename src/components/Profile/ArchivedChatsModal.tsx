import { useState } from "react"

import styled from "styled-components"

import { Dialog } from "@headlessui/react"

import { useArchivedChats } from "./hooks/useArchivedChats"

import { baseModal } from "../../ui/base"
import { Text } from "../../ui/atoms/Text"
import { Button } from "../../ui/atoms/Button"

import { ChatList } from "../Chat/components/ChatList"
import { Backdrop, ScrollablePanel, Wrapper } from "../Modal/components"

import { ChatType } from "../../types/chat"

type ArchivedChatsModalProps = {
  userId: string
}
export function ArchivedChatsModal({ userId }: ArchivedChatsModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const archivedChats = useArchivedChats(userId)

  return (
    <>
      <Button onClick={handleOpen}>Ver chats arquivados</Button>

      <Dialog open={isOpen} onClose={handleClose} className="fixed z-50">
        <Backdrop />

        <ScrollablePanel>
          <Wrapper>
            <Dialog.Panel>
              <ArchivedChatsContainer>
                <ArchivedChatsList list={archivedChats} />
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
}
function ArchivedChatsList({ list }: ArchivedChatsListProps) {
  if (!list?.length) return <ArchivedChatsSkeleton />

  return (
    <ChatList
      handleSelectChat={(chatId: string) => {
        alert(`Selecionando ${chatId}`)
      }}
      chats={list}
      handleCloseChat={() => {}}
      handleSendMessage={async (chatId: string, message: string) => {
        alert(`Sending to ${chatId} message: ${message}`)
      }}
      chatId={list[0].id}
    />
  )
}
