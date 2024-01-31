import { useState } from "react"

import styled from "styled-components"

import { Dialog } from "@headlessui/react"

import { Text } from "../../ui/atoms/Text"
import { Button } from "../../ui/atoms/Button"

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

const Backdrop = styled.div.attrs({ "aria-hidden": true })`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
`

const ScrollablePanel = styled.div`
  position: fixed;
  inset: 0;
  width: 100dvw;
  overflow-y: auto;
`

const Wrapper = styled.div`
  display: flex;
  min-height: 100%;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

const ArchivedChatsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  min-width: calc(320px - 4rem);
  max-width: 100dvw;
  padding: 1rem;
  gap: 1rem;
  background-color: var(--BLACK-I);
  border-radius: 10px;
`
