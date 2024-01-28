import { useCallback, useEffect, useState } from "react"

import socketIOClient, { Socket } from "socket.io-client"

import { useRecoilValue, useSetRecoilState } from "recoil"
import { UserAtom } from "../../../atoms/User"
import { ChatsAtom } from "../../../atoms/Chats"

import { ChatType } from "../../../types/chat"

const SOCKET_URL = "http://localhost:3434"

function initializeSocket() {
  return socketIOClient(SOCKET_URL, {
    autoConnect: false,
    reconnectionDelay: 5000,
    reconnectionDelayMax: 10000,
  })
}

export function useChats() {
  const setChats = useSetRecoilState(ChatsAtom)
  const user = useRecoilValue(UserAtom)

  const [chatSocket] = useState<Socket>(() => initializeSocket())

  const onChatsChange = useCallback(
    (chats: unknown) => {
      setChats(chats as ChatType[])
    },
    [setChats]
  )

  const handleSendMessage = useCallback(
    async (chatId: string, message: string) => {
      const messageSent = {
        chatId,
        message,
        userId: user?.id,
        timestamp: new Date().toISOString(),
      }

      chatSocket.emit("chat.send", messageSent)
    },
    [chatSocket, user?.id]
  )

  const handleCreateChat = useCallback(
    (chatName: string) => {
      const chatCreated = {
        userId: user?.id,
        name: chatName,
      }

      chatSocket.emit("chat.create", chatCreated)
    },
    [chatSocket, user?.id]
  )

  useEffect(() => {
    chatSocket.connect()

    chatSocket.on("connect", () => {
      if (!user?.id) return

      chatSocket.emit("user.chat.join", { userId: user.id })
    })

    chatSocket.on("user.chat.joined", onChatsChange)
    chatSocket.on("chats.received", onChatsChange)

    return () => {
      chatSocket.disconnect()
    }
  }, [onChatsChange, chatSocket, user?.id])

  return { handleSendMessage, handleCreateChat }
}