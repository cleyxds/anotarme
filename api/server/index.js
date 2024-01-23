/* eslint-disable no-undef */
import express from "express"

import { createServer } from "http"

import { Server as SocketIOServer } from "socket.io"

const APP_TRANSMITTER = express()

const server = createServer(APP_TRANSMITTER)

const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:5173", // Altere para a origem do seu frontend
    methods: ["GET", "POST"], // Métodos permitidos
    allowedHeaders: ["Content-Type"], // Headers permitidos
    credentials: true, // Permitir credenciais (cookies, cabeçalhos de autorização)
  },
})

// import CHATS from "../../src/components/Chat/data/chats.data.json" assert { type: "json" }

import { createClient } from "redis"
import { Repository, EntityId } from "redis-om"
import { ChatSchema } from "./src/models/Chat.js"
import { ulid } from "ulid"

const redis = createClient({ url: "redis://localhost:6380" })
redis.on("error", (err) => console.log("Redis Client Error", err))
await redis.connect()

const chatsRepository = new Repository(ChatSchema, redis)
await chatsRepository.createIndex()

async function processMessage(message) {
  await logMessage(message)

  await saveMessage(message)
}

async function logMessage(message) {
  console.log("Mensagem do cliente:", message)

  return message
}

async function saveMessage(message) {
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

  chat.messages.push(JSON.stringify(newMessageSent))

  await chatsRepository.save(chat)

  console.log(`Mensagem salva no chat ${chatId}: ${text}`)
}

async function getAllChats() {
  const chats = await chatsRepository
    .search()
    .return.all()
    .then(parseAllMessages)

  return chats
}

async function createChat(socket, data) {
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
    }

    const createdChat = await chatsRepository.save(chat)

    createdChat.identifier = createdChat[EntityId]

    await chatsRepository.save(createdChat)

    const chats = await getAllChats()

    socket.emit("chats.received", chats)

    return chat
  } catch (error) {
    console.warn(error.message)
  }
}

function parseAllMessages(chats) {
  return chats.map((chat) => ({
    ...chat,
    messages: chat.messages.map((message) => JSON.parse(message)),
  }))
}

io.on("connection", (socket) => {
  let userIdConnected = null

  console.log(`SOCKET | New socket connected ${socket.id}`)

  socket.on("chat.create", (data) => createChat(socket, data))

  socket.on("user.chat.join", async (data) => {
    const userId = data?.userId

    userIdConnected = userId

    console.log(`USER | ${userId} just joined`)

    const chats = await getAllChats()

    socket.emit("user.chat.joined", chats)
  })

  socket.on("chat.send", async (message) => {
    await processMessage(message)

    const chats = await getAllChats()

    socket.emit("chats.received", chats)
  })

  socket.on("disconnect", () => {
    console.log(
      `SOCKET-USER | Socket disconnected - UserId: ${userIdConnected}`
    )

    userIdConnected = null
  })
})

const DEFAULT_PORT = 3434
const PORT = process.env.PORT || DEFAULT_PORT

server.listen(PORT, () => {
  console.log(`Servidor Socket.IO está rodando na porta ${PORT}`)
})
