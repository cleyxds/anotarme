/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react"

import { useNavigate } from "react-router-dom"

import { useResetRecoilState, useSetRecoilState } from "recoil"
import { AuthAtom } from "../atoms/Auth"
import { UserAtom } from "../atoms/User"

import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"

import { auth, GoogleProvider } from "../utils/firebase"
import { createUserOnFirebase, getUserFromFirebase } from "../utils/user"

const catchAuthErrors = (error: Error) => {
  const errorMessage = error.message

  alert(errorMessage)
}

export function useAuthentication() {
  const resetUserAtom = useResetRecoilState(UserAtom)
  const resetAuthAtom = useResetRecoilState(AuthAtom)

  const setUserAtom = useSetRecoilState(UserAtom)
  const setAuthAtom = useSetRecoilState(AuthAtom)

  const navigate = useNavigate()

  const logout = useCallback(async () => {
    try {
      await signOut(auth)

      resetAuthAtom()
      resetUserAtom()
    } catch (error: any) {
      alert(error.message)
    }
  }, [resetAuthAtom, resetUserAtom])

  const authenticateUser = (user: User) => {
    setUserAtom(user)

    setAuthAtom({
      isAuthenticated: true,
      accessToken: "",
      expiresAt: 0,
    })
  }

  const signInWithProvider = useCallback(
    (providerName: string) => () => {
      const providers: { [key: string]: GoogleAuthProvider } = {
        google: GoogleProvider,
      }

      const selectedProvider = providers[providerName]

      if (!selectedProvider) throw new Error("Provider not implemented")

      signInWithPopup(auth, selectedProvider)
        .then(createUserOnFirebase)
        .then((userId) => getUserFromFirebase(userId!))
        .then(authenticateUser)
        .then(() => navigate("/chats"))
        .catch(catchAuthErrors)
    },
    []
  )

  return { logout, signInWithProvider }
}
