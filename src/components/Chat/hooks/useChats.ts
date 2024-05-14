import { useCallback, useEffect } from "react"

import { collection, onSnapshot, query, where } from "firebase/firestore"

import { useRecoilValue, useSetRecoilState } from "recoil"
import { UserAtom } from "../../../atoms/User"
import { ChatsAtom } from "../../../atoms/Chats"

import { ChatType } from "../../../types/chat"

import {
  CHATS_COLLECTION,
  archiveChatById,
  clearChatById,
  createChat,
  createMessageInChat,
  deleteChat,
} from "../../../utils/chat"
import { db } from "../../../utils/firebase"

export function useChats() {
  const setChats = useSetRecoilState(ChatsAtom)
  const user = useRecoilValue(UserAtom)

  const handleSendMessage = useCallback(
    async (chatId: string, message: string) => {
      const messageSent = {
        chatId,
        text: message,
        userId: user?.id,
        timestamp: new Date().toISOString(),
      }

      createMessageInChat(messageSent)
    },
    [user?.id]
  )

  const handleCreateChat = useCallback(
    (chatName: string) => {
      const chatCreated = {
        userId: user?.id,
        name: chatName,
      }

      const isValidFields = Object.values(chatCreated).every(Boolean)

      if (!isValidFields) return

      createChat(chatCreated)
    },
    [user?.id]
  )

  const handleDeleteChat = useCallback(
    (chatId: string) => {
      if (!chatId) return

      const chatDeleted = {
        userId: user?.id,
        chatId,
      }

      deleteChat(chatDeleted)
    },
    [user?.id]
  )

  const handleArchiveChat = useCallback(
    async (chatId: string) => {
      if (!chatId) return

      const archiveChat = {
        userId: user?.id,
        chatId,
        archived: true,
      }

      await archiveChatById(archiveChat)
    },
    [user?.id]
  )

  const handleClearChat = useCallback(
    async (chatId: string) => {
      if (!chatId) return

      const clearedChat = {
        userId: user?.id,
        chatId,
      }

      await clearChatById(clearedChat)
    },
    [user?.id]
  )

  useEffect(() => {
    const userOwnedChatsRef = `${user?.id}/owned`

    const ownedUserChats = collection(db, CHATS_COLLECTION, userOwnedChatsRef)
    const unarchivedChats = query(
      ownedUserChats,
      where("status", "==", "ACTIVE")
    )

    const unsub = onSnapshot(unarchivedChats, (doc) => {
      const chats = doc.docs?.map((doc) => doc.data())

      setChats(chats as ChatType[])
    })

    return () => {
      unsub()
    }
  }, [setChats, user?.id])

  return {
    handleSendMessage,
    handleCreateChat,
    handleClearChat,
    handleDeleteChat,
    handleArchiveChat,
  }
}
