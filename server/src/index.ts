/* eslint-disable no-undef */
import { config } from "dotenv"
config({ path: ".env" })

import { initializeDatabase } from "./database/connection"
import { createConnection } from "./server/connection"

import chatHandler from "./controllers/chat-handler"

const DEFAULT_PORT = 3434
const PORT = process.env.PORT || DEFAULT_PORT

async function initialize() {
  const { io, server } = createConnection()
  const { chatsRepository } = await initializeDatabase()

  io.on("connection", (socket) => chatHandler(chatsRepository, socket))

  const logServer = () => console.log(`Socket.IO running on PORT ${PORT}`)

  server.listen(PORT, logServer)
}

initialize()
