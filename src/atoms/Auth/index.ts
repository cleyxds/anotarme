import { atom } from "recoil"

import { Auth } from "../../types/auth"

import { getAuth, removeAuth, storeAuth } from "../../utils/auth"

export const AuthAtom = atom<Auth | null>({
  key: "AuthAtomKey",
  default: null,
  effects: [persistAuth_Effect],
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function persistAuth_Effect({ setSelf, onSet }: any) {
  const savedAuthValue = getAuth()

  if (savedAuthValue != null) {
    setSelf(savedAuthValue)
  }

  onSet((newValue: Auth, _: Auth | null, isReset: boolean) => {
    isReset ? removeAuth() : storeAuth(newValue)
  })
}
