import { useEffect, useMemo, useRef, useState } from "react"

import { useSearchParams } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { UserAtom } from "../../../atoms/User"
import { ChatsAtom } from "../../../atoms/Chats"

export function useChat() {
  const user = useRecoilValue(UserAtom)

  const [chatId, setChatId] = useState("")
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const chats = useRecoilValue(ChatsAtom)

  const [searchParams, setSearchParams] = useSearchParams()
  const PARAMS_CHAT_ID = searchParams.get("chatId")

  const selectedChat = useMemo(
    () => chats.find((chat) => chat.identifier === chatId),
    [chatId, chats]
  )

  useEffect(() => {
    if (!PARAMS_CHAT_ID) return

    handleSelectChat(PARAMS_CHAT_ID)
  }, [PARAMS_CHAT_ID])

  const chatInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    chatInputRef.current?.focus()
  }, [])

  useEffect(() => {
    document.title = `Anotar me | Chat: ${chatId}`
  }, [chatId])

  function handleSelectChat(chatId: string) {
    setSearchParams({ chatId })
    setChatId(chatId)

    // chatInputRef.current?.focus()
  }

  function handleCloseChat() {
    searchParams.delete("chatId")

    setSearchParams(searchParams)
    setChatId("")
  }

  const profile = useMemo(
    () => ({
      id: user?.id,
      image: user?.image,
    }),
    [user?.id, user?.image]
  )

  const selectedChatInfo = useMemo(
    () => ({
      name: selectedChat?.name,
      image: selectedChat?.image,
      members: selectedChat?.members,
    }),
    [selectedChat?.image, selectedChat?.members, selectedChat?.name]
  )

  return {
    chatId,
    handleSelectChat,
    handleCloseChat,
    selectedChat,
    chats,
    chatInputRef,
    profile,
    selectedChatInfo,
  }
}
