import { useEffect } from "react"

import { collection, onSnapshot, query, where } from "firebase/firestore"

import { useRecoilState, useResetRecoilState } from "recoil"
import { ChatsAtom } from "../../../atoms/Chats"

import { db } from "../../../utils/firebase"
import { CHATS_COLLECTION } from "../../../utils/chat"

export function useArchivedChats(userId: string) {
  const [archivedChats, setArchivedChats] = useRecoilState(ChatsAtom)
  const resetChatsAtom = useResetRecoilState(ChatsAtom)

  useEffect(() => {
    const userOwnedChatsRef = `${userId}/owned`

    const ownedUserChats = collection(db, CHATS_COLLECTION, userOwnedChatsRef)
    const unarchivedChats = query(
      ownedUserChats,
      where("status", "==", "ARCHIVED")
    )

    const unsub = onSnapshot(unarchivedChats, (doc) => {
      const chats = doc.docs?.map((doc) => doc.data())

      setArchivedChats(chats as ChatType[])
    })

    return () => {
      unsub()
      resetChatsAtom()
    }
  }, [resetChatsAtom, setArchivedChats, userId])

  return archivedChats
}
