/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserCredential } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"

import { db } from "./firebase"

import { User } from "../types/user"

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

export {
  storeUser,
  getUser,
  removeUser,
  createUserOnFirebase,
  getUserFromFirebase,
}
