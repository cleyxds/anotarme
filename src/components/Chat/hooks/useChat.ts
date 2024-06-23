import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { useSearchParams } from "react-router-dom"

import { useRecoilValue } from "recoil"
import { UserAtom } from "../../../atoms/User"
import { ChatsAtom } from "../../../atoms/Chats"

import { compareDesc, parseISO } from "date-fns"

import DEFAULT_IMAGE_SRC from "../../../assets/images/DefaultUserImage.png"

const sortChatsByLastUpdated = (chats: ChatType[]) => {
  return chats.sort((a, b) => {
    const dateA = parseISO(a.lastUpdated!)
    const dateB = parseISO(b.lastUpdated!)
    return compareDesc(dateA, dateB)
  })
}

export function useChat(hideTitle = false) {
  const user = useRecoilValue(UserAtom)
  const userHideChatTitle = hideTitle ? hideTitle : user?.hideTitle

  const chatInputRef = useRef<HTMLInputElement>(null)
  const chatAreaRef = useRef<HTMLDivElement>(null)
  const chatInputMobileRef = useRef<HTMLInputElement>(null)
  const chatAreaMobileRef = useRef<HTMLDivElement>(null)
  const [chatId, setChatId] = useState("")
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

  const mychats = useMemo(() => {
    return sortChatsByLastUpdated([...chats])
  }, [chats])

  useEffect(() => {
    if (!PARAMS_CHAT_ID) return

    handleSelectChat(PARAMS_CHAT_ID)

    if (chatAreaRef.current || chatAreaMobileRef.current) {
      chatAreaRef.current?.scrollTo(0, chatAreaRef.current?.scrollHeight)

      chatAreaMobileRef.current?.scrollTo(
        0,
        chatAreaMobileRef.current?.scrollHeight
      )
    }

    // No need to update the dependency array
  }, [PARAMS_CHAT_ID, chatAreaRef.current])

  useEffect(() => {
    focusInput()
  }, [])

  useEffect(() => {
    if (userHideChatTitle) return

    if (!selectedChatInfo.name) {
      document.title = "Chatao | Chat"

      return
    }

    document.title = `Chatao | Chat: ${selectedChatInfo.name}`
  }, [selectedChatInfo.name, userHideChatTitle])

  const clearInput = useCallback(() => {
    if (!chatInputRef.current) return

    chatInputRef.current.value = ""
  }, [])

  const focusInput = useCallback(() => {
    const timeoutRef = setTimeout(() => {
      if (!chatInputRef.current) return

      chatInputRef.current?.focus()

      clearTimeout(timeoutRef)
    }, 50)
  }, [])

  function handleSelectChat(chatIdSelected: string) {
    if (chatIdSelected === chatId) {
      focusInput()

      return
    }

    setSearchParams({ chatId: chatIdSelected })

    setChatId(chatIdSelected)

    if (!chatInputRef.current) return

    clearInput()
    focusInput()
  }

  function handleCloseChat() {
    searchParams.delete("chatId")

    setSearchParams(searchParams)
    setChatId("")
    clearInput()
  }

  const profile = useMemo(() => {
    if (!user?.id) return null

    const USER_IMAGE = user?.profile.avatar_url

    const image = USER_IMAGE ? USER_IMAGE : DEFAULT_IMAGE_SRC

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
    mychats,
    chatInputRef,
    chatInputMobileRef,
    chatAreaRef,
    chatAreaMobileRef,
    profile,
    selectedChatInfo,
  }
}
