import { useCallback, useState } from "react"

import { Dialog } from "@headlessui/react"

import styled from "styled-components"

import { baseModal } from "../../../ui/base"
import { Text } from "../../../ui/atoms/Text"
import { Button } from "../../../ui/atoms/Button"

import { Backdrop, ScrollablePanel, Wrapper } from "../../Modal/components"

import { Trash } from "../../../assets/icons"

type DeleteChatProps = {
  chatId: string
  handleDeleteChat?: (chatId: string) => void
  chatName?: string
}

export function DeleteChat({
  chatId,
  chatName,
  handleDeleteChat,
}: DeleteChatProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleChatDeletion = useCallback(() => {
    try {
      if (!handleDeleteChat || !chatId) return

      handleDeleteChat(chatId)
    } catch (error) {
      console.error(error)
    } finally {
      handleClose()
    }
  }, [chatId, handleDeleteChat])

  return (
    <>
      <DeleteButton onClick={handleOpen}>
        <Trash /> Deletar
      </DeleteButton>

      <Dialog open={isOpen} onClose={handleClose} className="fixed z-50">
        <Backdrop />

        <ScrollablePanel>
          <Wrapper>
            <Dialog.Panel>
              <DeleteChatContainer>
                <Text
                  as="span"
                  size="small"
                  color="WHITE-I"
                  type="SUISSETINTLBOLD"
                >
                  Tem certeza que deseja deletar o chat{" "}
                  <Text
                    as="span"
                    size="small"
                    type="SUISSETINTLBOLD"
                    color="GREEN-XII"
                  >
                    {chatName}
                  </Text>
                  ?
                </Text>

                <div className="flex w-full gap-4">
                  <YesButton className="w-1/2" onClick={handleChatDeletion}>
                    Sim
                  </YesButton>

                  <NoButton className="w-1/2" onClick={handleClose}>
                    Não
                  </NoButton>
                </div>
              </DeleteChatContainer>
            </Dialog.Panel>
          </Wrapper>
        </ScrollablePanel>
      </Dialog>
    </>
  )
}

const DeleteButton = styled(Button)`
  &:hover {
    background-color: var(--RED-I);
    color: var(--WHITE-I);
    transition: background-color 0.3s;
  }
`

const YesButton = styled(Button)`
  background-color: var(--RED-I);
  color: var(--WHITE-I);

  &:hover {
    background-color: var(--RED-I);
    color: var(--WHITE-I);
    opacity: 0.8;
  }
`

const NoButton = styled(Button)`
  background-color: var(--GREEN-XII);
  color: var(--WHITE-I);

  &:hover {
    background-color: var(--GREEN-XII);
    color: var(--WHITE-I);
    opacity: 0.8;
  }
`

const DeleteChatContainer = styled.div`
  ${baseModal}
  max-width: 420px;
`
