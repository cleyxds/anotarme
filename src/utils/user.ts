/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserCredential } from "firebase/auth"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore"

import { db } from "./firebase"

const USER_STORAGE_KEY = "user.data"
const USERS_COLLECTION = "users"

function storeUser(user: User) {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))

    return user
  } catch (error) {
    console.error(error)
  }
}

function getUser() {
  try {
    const user = localStorage.getItem(USER_STORAGE_KEY)

    if (user) {
      return JSON.parse(user)
    }

    return null
  } catch (error) {
    console.error(error)
  }
}

function removeUser() {
  try {
    localStorage.removeItem(USER_STORAGE_KEY)
  } catch (error) {
    console.error(error)
  }
}

async function createUserOnFirebase({ user }: UserCredential) {
  try {
    const name = user.displayName

    const userId = user.uid
    const email = user.email!
    const firstName = name
    const lastName = ""
    const avatar_url = user.photoURL
    const now = new Date().toISOString()
    const provider = user.providerId

    const userProfile: User = {
      id: userId,
      activatedAt: null,
      createdAt: now,
      credentials: { provider },
      lastLogin: now,
      lastUpdated: now,
      locale: "pt-BR",
      passwordChangedAt: now,
      profile: {
        avatar_url,
        email,
        firstName: firstName!,
        lastName: lastName!,
        login: email,
        phone: "",
      },
      status: "PENDING",
      statusChanged: now,
    }

    await createUserProfile(userProfile)

    return userId
  } catch (error: any) {
    console.log(error.message)
  }
}

async function getUserFromFirebase(userId: string): Promise<User> {
  try {
    const userDocRef = doc(db, USERS_COLLECTION, userId)
    const userDocSnap = await getDoc(userDocRef)

    if (userDocSnap.exists()) {
      return userDocSnap.data() as User
    }

    return {} as User
  } catch (error: any) {
    return {} as User
  }
}

const createUserProfile = async ({ id, ...data }: { id: string }) => {
  try {
    const userDocPath = id

    const userRef = doc(db, USERS_COLLECTION, userDocPath)

    await setDoc(userRef, { id, ...data })
  } catch (error: any) {
    const ERROR_MESSAGE = error.message

    console.error(ERROR_MESSAGE)
  }
}

const getMembersToChat = async (userId: string) => {
  const usersCollectionRef = collection(db, USERS_COLLECTION)

  const queryUsersCollection = query(
    usersCollectionRef,
    where("id", "!=", userId)
  )

  const usersToChatDocs = await getDocs(queryUsersCollection)

  const usersToChat = usersToChatDocs.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  return usersToChat as User[]
}

export {
  storeUser,
  getUser,
  removeUser,
  createUserOnFirebase,
  getMembersToChat,
  getUserFromFirebase,
}
