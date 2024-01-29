import { Schema } from "redis-om"

export const ChatSchema = new Schema(
  "Chat",
  {
    identifier: { type: "string", indexed: true },
    owner: { type: "string", indexed: true },
    name: { type: "string", indexed: false },
    createdAt: { type: "date", indexed: false },
    lastUpdated: { type: "date", indexed: false },
    status: { type: "string", indexed: false },
    image: { type: "string" },
    messages: { type: "string[]" },
    members: { type: "string[]" },
  },
  {
    dataStructure: "JSON",
  }
)
