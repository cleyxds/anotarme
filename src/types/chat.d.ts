export type ChatType = {
  id: string
  name: string
  user: User
  messages: Message[]
  members?: string[]
  createdAt: string
  image: string
}

type User = { image: string }
type Message = {
  id: number
  text: string
  timestamp: string
  user?: User
}

type ChatIdProps = {
  chatId?: string | null
}
