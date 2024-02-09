import { useCallback } from "react"

import styled from "styled-components"

import { Input } from "../../../ui/atoms/Input"
import { Button } from "../../../ui/atoms/Button"

export function CreateChatForm({
  handleCreateChat,
}: {
  handleCreateChat: (chatName: string) => void
}) {
  const handleFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const chatName = event.currentTarget["chat-name"].value

      if (!chatName) return

      handleCreateChat(chatName)

      event.currentTarget["chat-name"].value = ""
    },
    [handleCreateChat]
  )

  return (
    <CreateChatFormContainer onSubmit={handleFormSubmit}>
      <Input
        id="chat-name"
        required
        name="chat-name"
        placeholder="Insira o nome do chat"
      />

      <Button type="submit">Criar chat</Button>
    </CreateChatFormContainer>
  )
}

const CreateChatFormContainer = styled.form`
  position: absolute;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1406px) {
    display: none;
  }
`
