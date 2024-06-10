type ChatType = {
  id: string
  identifier: string
  name: string
  user: ChatUser
  messages: Message[]
  members?: string[]
  createdAt: string
  image: string
  createdAt?: string
  lastUpdated?: string
  owner?: string
  status?: string
  archived?: boolean
}

type ChatUser = { image: string }
type Message = {
  id?: number
  text: string
  timestamp: string
  user?: User
}

type ChatIdProps = {
  chatId?: string | null
}
