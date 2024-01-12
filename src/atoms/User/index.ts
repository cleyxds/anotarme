import { atom } from "recoil"

import { User } from "../../types/user"

export const UserAtom = atom<User | null>({
  key: "UserAtomKey",
  default: {
    id: "asd2o92k091k2",
    name: "John Doe",
  },
})
