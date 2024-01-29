import { createClient } from "redis"
import { Repository } from "redis-om"

import { ChatSchema } from "../models/Chat"

const REDIS_URL = process.env.REDIS_URL as string

async function initializeDatabase() {
  try {
    const redis = createClient({ url: REDIS_URL })
    redis.on("error", (err) => console.log("Redis Client Error", err))

    await redis.connect()

    const chatsRepository = new Repository(ChatSchema, redis)

    await chatsRepository.createIndex()

    return { chatsRepository }
  } catch (err) {
    throw new Error("Erro ao conectar com o banco de dados")
  }
}

export { initializeDatabase }
