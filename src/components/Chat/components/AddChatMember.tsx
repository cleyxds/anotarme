import { useState } from "react"

import styled from "styled-components"

import { baseModal } from "../../../ui/base"
import { Button } from "../../../ui/atoms/Button"
import { Text } from "../../../ui/atoms/Text"

import MemberList from "./MemberList"

import { UsersThree, ArrowLeft } from "../../../assets/icons"

type DeleteChatProps = {
  chatId: string
  chatName?: string
  handleAddMembers?: (chatId: string, members: string[]) => void
}

export function AddChatMember({
  chatId,
  chatName,
  handleAddMembers,
}: DeleteChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleSelectMember = (memberId: string) => {
    setSelectedMembers((state) => {
      if (state?.includes(memberId))
        return state.filter((id) => id !== memberId)

      return [...state, memberId]
    })
  }

  const handleConfirmSelection = () => {
    if (!selectedMembers?.length)
      return alert("Precisa selecionar pelo menos um membro novo")

    handleAddMembers?.(chatId, selectedMembers)
  }

  const memberListProps = {
    selectedMembers,
    handleSelectMember,
  }

  return (
    <>
      <Button onClick={handleOpen}>
        <UsersThree /> Adicionar membro
      </Button>

      {isOpen && (
        <DeleteChatContainer>
          <CloseAddMemberButton onClick={handleClose}>
            <ArrowLeft />
          </CloseAddMemberButton>

          <Text as="span" size="small" color="WHITE-I" type="SUISSETINTLBOLD">
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

          <MemberList {...memberListProps} />

          <Button onClick={handleConfirmSelection}>Confirmar</Button>
        </DeleteChatContainer>
      )}
    </>
  )
}

const DeleteChatContainer = styled.section`
  ${baseModal}
  width: min-content;
  border: 1px solid var(--GREEN-XI);
`

const CloseAddMemberButton = styled(Button)`
  align-self: flex-start;
  &:hover {
    background-color: var(--RED-I);
    color: var(--WHITE-I);
  }
`
