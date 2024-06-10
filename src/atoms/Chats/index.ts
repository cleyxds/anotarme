import { atom } from "recoil"

export const ChatsAtom = atom<ChatType[]>({
  key: "messagesAtom",
  default: [],
})
