import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { useSearchParams } from "react-router-dom"

import { useRecoilValue } from "recoil"
import { UserAtom } from "../../../atoms/User"
import { ChatsAtom } from "../../../atoms/Chats"

export function useChat() {
  const user = useRecoilValue(UserAtom)

  const chatInputRef = useRef<HTMLInputElement>(null)
  const [chatId, setChatId] = useState("")
  const [informationModalOpen, setInformationModalOpen] = useState(false)
  const chats = useRecoilValue(ChatsAtom)

  const [searchParams, setSearchParams] = useSearchParams()
  const PARAMS_CHAT_ID = searchParams.get("chatId")

  const selectedChat = useMemo(
    () => chats.find((chat) => chat.identifier === chatId),
    [chatId, chats]
  )

  const selectedChatInfo = useMemo(
    () => ({
      name: selectedChat?.name,
      image: selectedChat?.image,
      members: selectedChat?.members,
    }),
    [selectedChat?.image, selectedChat?.members, selectedChat?.name]
  )

  const reversedChats = useMemo(() => [...chats].reverse(), [chats])

  useEffect(() => {
    if (!PARAMS_CHAT_ID) return

    handleSelectChat(PARAMS_CHAT_ID)

    // No need to update the dependency array
  }, [PARAMS_CHAT_ID])

  useEffect(() => {
    chatInputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!selectedChatInfo.name) {
      document.title = "Chatao | Chat"

      return
    }

    document.title = `Chatao | Chat: ${selectedChatInfo.name}`
  }, [selectedChatInfo.name])

  const isChatOwnerOrMember = useCallback(
    (chatId: string) => chats.map((chat) => chat.identifier)?.includes(chatId),
    [chats]
  )

  function handleSelectChat(chatId: string) {
    setSearchParams({ chatId })

    if (!isChatOwnerOrMember(chatId)) {
      setInformationModalOpen(true)

      return
    }

    setChatId(chatId)

    // chatInputRef.current?.focus()
  }

  function handleCloseChat() {
    searchParams.delete("chatId")

    setSearchParams(searchParams)
    setChatId("")
  }

  const profile = useMemo(() => {
    if (!user?.id) return null

    const USER_IMAGE = user?.profile.avatar_url

    const image = USER_IMAGE ? USER_IMAGE : "/DefaultUserImage.png"

    return {
      id: user?.id,
      image,
    }
  }, [user?.id, user?.profile.avatar_url])

  return {
    chatId,
    handleSelectChat,
    handleCloseChat,
    selectedChat,
    reversedChats,
    chatInputRef,
    profile,
    selectedChatInfo,
    informationModalOpen,
  }
}
