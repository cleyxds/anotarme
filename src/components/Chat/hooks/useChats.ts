import { useCallback, useEffect } from "react"

import { collection, onSnapshot } from "firebase/firestore"

import { useRecoilValue, useSetRecoilState } from "recoil"
import { UserAtom } from "../../../atoms/User"
import { ChatsAtom } from "../../../atoms/Chats"

import { ChatType } from "../../../types/chat"

import {
  CHATS_COLLECTION,
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

  useEffect(() => {
    const userOwnedChatsRef = `${user?.id}/owned`

    const unsub = onSnapshot(
      collection(db, CHATS_COLLECTION, userOwnedChatsRef),
      (doc) => {
        const chats = doc.docs?.map((doc) => doc.data())

        setChats(chats as ChatType[])
      }
    )

    return () => {
      unsub()
    }
  }, [setChats, user?.id])

  return { handleSendMessage, handleCreateChat, handleDeleteChat }
}
