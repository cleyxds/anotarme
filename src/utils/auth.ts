import { Auth } from "../types/auth"

const AUTH_STORAGE_KEY = "auth.state"

function storeAuth(auth: Auth) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth))

    return auth
  } catch (error) {
    console.error(error)
  }
}

function getAuth() {
  try {
    const auth = localStorage.getItem(AUTH_STORAGE_KEY)

    if (auth) {
      return JSON.parse(auth)
    }

    return null
  } catch (error) {
    console.error(error)
  }
}

function removeAuth() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  } catch (error) {
    console.error(error)
  }
}

export { storeAuth, getAuth, removeAuth }
