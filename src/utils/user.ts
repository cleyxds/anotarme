import { User } from "../types/user"

const USER_STORAGE_KEY = "user.data"

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

export { storeUser, getUser, removeUser }
