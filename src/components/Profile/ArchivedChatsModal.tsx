import { useState } from "react"

import styled from "styled-components"

import { Dialog } from "@headlessui/react"

import { baseModal } from "../../ui/base"
import { Text } from "../../ui/atoms/Text"
import { Button } from "../../ui/atoms/Button"
import { Backdrop, ScrollablePanel, Wrapper } from "../Modal/components"

export function ArchivedChatsModal() {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <>
      <Button onClick={handleOpen}>Ver chats arquivados</Button>

      <Dialog open={isOpen} onClose={handleClose} className="fixed z-50">
        <Backdrop />

        <ScrollablePanel>
          <Wrapper>
            <Dialog.Panel>
              <ArchivedChatsContainer>
                <ArchivedChatsList />
                <ArchivedChatsSkeleton />
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

function ArchivedChatsList() {
  return null
}
