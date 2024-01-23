export type ChatType = {
  id: string
  identifier: string
  name: string
  user: User
  messages: Message[]
  members?: string[]
  createdAt: string
  image: string
  createdAt?: string
  lastUpdated?: string
  owner?: string
  status?: string
}

type User = { image: string }
type Message = {
  id?: number
  text: string
  timestamp: string
  user?: User
}

type ChatIdProps = {
  chatId?: string | null
}
