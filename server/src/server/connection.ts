import express from "express"

import { createServer } from "http"

import { ServerOptions, Server as SocketIOServer } from "socket.io"

const SOCKET_I0_OPTIONS: Partial<ServerOptions> = {
  cors: {
    origin: ["http://localhost:5173", "https://anotar-me-ee31f.web.app/"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
}

function createConnection() {
  const APP_TRANSMITTER = express()

  const server = createServer(APP_TRANSMITTER)

  const io = new SocketIOServer(server, SOCKET_I0_OPTIONS)

  return { io, server }
}

export { createConnection }
