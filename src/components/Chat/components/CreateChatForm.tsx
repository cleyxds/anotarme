import { useCallback } from "react"

import styled, { css } from "styled-components"

import { Input } from "../../../ui/atoms/Input"
import { Button } from "../../../ui/atoms/Button"

type IChatOpen = {
  chatopen: boolean
}

type CreateChatFormProps = IChatOpen & {
  handleCreateChat: (chatName: string) => void
}

export function CreateChatForm({
  handleCreateChat,
  chatopen,
}: CreateChatFormProps) {
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
    <CreateChatFormContainer chatopen={chatopen} onSubmit={handleFormSubmit}>
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

const CreateChatFormContainer = styled.form<IChatOpen>`
  position: absolute;
  top: 0;
  z-index: 50;
  display: none;
  align-items: center;
  gap: 1rem;
  background-color: var(--WHITE-I);

  @media (width > 1200px) {
    display: flex;
  }

  @media (width < 668px) {
    ${({ chatopen }) => hidechat(chatopen)}
  }
`

const hidechat = (chatopen: boolean) => {
  if (chatopen)
    return css`
      display: none;
    `

  return css`
    display: flex;
  `
}
