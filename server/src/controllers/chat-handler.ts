/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Socket } from "socket.io"
import { EntityId, Repository } from "redis-om"

import { ulid } from "ulid"

const CHAT_CREATE = "chat.create"
const CHAT_SEND = "chat.send"
const USER_CHAT_JOIN = "user.chat.join"
const USER_CHAT_JOINED = "user.chat.joined"
const CHATS_RECEIVED = "chats.received"

export default (chatsRepository: Repository, socket: Socket) => {
  console.log(`SOCKET | New socket connected ${socket.id}`)

  handleCreateChat(socket, chatsRepository)
  handleSocketDisconnect(socket)
  handleUserJoinChat(socket, chatsRepository)

  handleSendMessage(socket, chatsRepository)
}

const handleSocketDisconnect = (socket: Socket) => {
  socket.on("disconnect", () => {
    console.log(`SOCKET-USER | Socket disconnected`)
  })
}

const handleCreateChat = (socket: Socket, chatsRepository: Repository) => {
  async function createChat(data: { userId: string; name: string }) {
    try {
      const owner = data["userId"]
      const name = data["name"]
      const now = new Date().toISOString()

      const chat = {
        owner,
        name,
        createdAt: now,
        lastUpdated: now,
        status: "active",
        image: "https://picsum.photos/200",
        messages: [],
        members: [owner],
        hidden: false,
      }

      const createdChat = await chatsRepository.save(chat)

      createdChat.identifier = createdChat[EntityId]

      await chatsRepository.save(createdChat)

      const chats = await getAllChats(chatsRepository, owner)

      socket.emit(CHATS_RECEIVED, chats)

      return chat
    } catch (error) {
      console.warn(error.message)
    }
  }

  socket.on(CHAT_CREATE, createChat)
}

const handleUserJoinChat = (socket: Socket, chatsRepository: Repository) => {
  socket.on(USER_CHAT_JOIN, async (data) => {
    const userId = data?.userId

    console.log(`USER | ${userId} just joined`)

    const chats = await getAllChats(chatsRepository, userId)

    socket.emit(USER_CHAT_JOINED, chats)
  })
}

const handleSendMessage = (socket: Socket, chatsRepository: Repository) => {
  const logMessage = (message) => {
    console.log("New message", message)

    return message
  }

  const saveMessage = async (message: { chatId: string; message: string }) => {
    const chatId = message["chatId"]
    const text = message["message"]
    const now = new Date().toISOString()

    const chat = await chatsRepository.fetch(chatId)

    if (!chat) {
      console.warn("Chat não encontrado:", chatId)

      return
    }

    const newMessageSent = {
      id: ulid(),
      text,
      timestamp: now,
    }

    // @ts-ignore
    chat.messages.push(JSON.stringify(newMessageSent))

    await chatsRepository.save(chat)

    console.log(`Mensagem salva no chat ${chatId}: ${text}`)
  }

  async function processMessage(message) {
    await logMessage(message)

    await saveMessage(message)
  }

  socket.on(CHAT_SEND, async (message) => {
    const ownerId = message["userId"]

    await processMessage(message)

    const chats = await getAllChats(chatsRepository, ownerId)

    socket.broadcast.emit(CHATS_RECEIVED, chats)
    socket.emit(CHATS_RECEIVED, chats)
  })
}

async function getAllChats(chatsRepository: Repository, ownerId: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseAllMessages = (chats: any[]) => {
    return chats.map((chat) => ({
      ...chat,
      messages: chat.messages.map((message) => JSON.parse(message)),
    }))
  }

  const chats = await chatsRepository
    .search()
    .where("hidden")
    .equal(false)
    .where("owner")
    .equal(ownerId)
    .return.all()
    .then(parseAllMessages)

  return chats
}
