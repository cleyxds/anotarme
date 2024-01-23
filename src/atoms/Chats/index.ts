import { atom } from "recoil"

import { ChatType } from "../../types/chat"

export const ChatsAtom = atom<ChatType[]>({
  key: "messagesAtom",
  default: [],
})
