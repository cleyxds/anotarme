import { atom } from "recoil"

import { getUser, removeUser, storeUser } from "../../utils/user"

export const UserAtom = atom<User | null>({
  key: "UserAtomKey",
  default: null,
  effects: [persistUser_Effect],
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function persistUser_Effect({ setSelf, onSet }: any) {
  const savedUserValue = getUser()

  if (savedUserValue != null) {
    setSelf(savedUserValue)
  }

  onSet((newValue: User, _: User | null, isReset: boolean) => {
    isReset ? removeUser() : storeUser(newValue)
  })
}
