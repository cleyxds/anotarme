import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore"

import { db } from "./firebase"
import { ChatType } from "../types/chat"

const CHATS_COLLECTION = "chats"

async function createChat(data: { userId: any; name: any }) {
  try {
    const userId = data.userId as string
    const chatName = data?.name

    const chatPath = `${CHATS_COLLECTION}/${userId}/owned`

    const chatsCollectionRef = collection(db, chatPath)

    const now = new Date().toISOString()

    const identifier = chatsCollectionRef.id

    const newChatData: ChatType = {
      id: identifier,
      identifier,
      image:
        "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U",
      messages: [],
      name: chatName,
      user: {
        image:
          "https://fastly.picsum.photos/id/870/200/300.jpg?blur=2&grayscale&hmac=ujRymp644uYVjdKJM7kyLDSsrqNSMVRPnGU99cKl6Vs",
      },
      createdAt: now,
      lastUpdated: now,
      members: [userId],
      owner: userId,
      status: "ACTIVE",
    }

    const futureDoc = await addDoc(chatsCollectionRef, newChatData)
    const docId = futureDoc.id

    const futureDocRef = doc(db, CHATS_COLLECTION, `${userId}/owned/${docId}`)
    await updateDoc(futureDocRef, {
      id: docId,
      identifier: docId,
    })
  } catch (error: any) {
    console.log(error.message)
  }
}

async function createMessageInChat(data: any) {
  try {
    const userId = data.userId as string
    const chatId = data.chatId

    const chatDocRef = doc(db, CHATS_COLLECTION, `${userId}/owned/${chatId}`)

    await updateDoc(chatDocRef, {
      messages: arrayUnion(data),
    })
  } catch (error: any) {
    console.error(error)
  }
}

type DeleteChatParams = { userId: any; chatId: any }
async function deleteChat(data: DeleteChatParams) {
  try {
    const userId = data.userId as string
    const chatId = data.chatId as string

    const chatDocRef = doc(db, CHATS_COLLECTION, `${userId}/owned/${chatId}`)

    await deleteDoc(chatDocRef)
  } catch (error: any) {
    console.error(error)
  }
}

async function archiveChatById(data: DeleteChatParams & { archived: boolean }) {
  try {
    const userId = data.userId as string
    const chatId = data.chatId as string

    const chatDocRef = doc(db, CHATS_COLLECTION, `${userId}/owned/${chatId}`)

    await updateDoc(chatDocRef, {
      status: "ARCHIVED",
    })
  } catch (error: any) {
    console.error(error)
  }
}

async function clearChatById(data: DeleteChatParams) {
  try {
    const userId = data.userId as string
    const chatId = data.chatId as string

    const chatDocRef = doc(db, CHATS_COLLECTION, `${userId}/owned/${chatId}`)

    await updateDoc(chatDocRef, {
      messages: [],
    })
  } catch (error: any) {
    console.error(error)
  }
}

export {
  CHATS_COLLECTION,
  createChat,
  createMessageInChat,
  deleteChat,
  clearChatById,
  archiveChatById,
}
