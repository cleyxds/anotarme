import { useEffect, useState } from "react"

import { Dialog } from "@headlessui/react"

import styled from "styled-components"

import { baseModal } from "../../../ui/base"

import { Button } from "../../../ui/atoms/Button"
import { Text } from "../../../ui/atoms/Text"

import { Backdrop, ScrollablePanel, Wrapper } from "../../Modal/components"

import { UsersThree } from "../../../assets/icons"

type DeleteChatProps = {
  chatId: string
  handleAddMembers: (chatId: string) => void
  chatName?: string
}

export function AddChatMember({ chatName }: DeleteChatProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  useEffect(() => {}, [])

  const handleConfirmSelection = () => {}

  return (
    <>
      <Button onClick={handleOpen}>
        <UsersThree /> Adicionar membro
      </Button>

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
                  Quem você gostaria de adicionar à{" "}
                  <Text
                    as="span"
                    size="small"
                    type="SUISSETINTLBOLD"
                    color="GREEN-XII"
                  >
                    {chatName}
                  </Text>
                </Text>

                <Button onClick={handleConfirmSelection}>Confirmar</Button>
              </DeleteChatContainer>
            </Dialog.Panel>
          </Wrapper>
        </ScrollablePanel>
      </Dialog>
    </>
  )
}

const DeleteChatContainer = styled.div`
  ${baseModal}
  max-width: 420px;
`
