import { atom } from "recoil"

import { User } from "../../types/user"

export const UserAtom = atom<User | null>({
  key: "UserAtomKey",
  default: {
    id: "asd2o92k091k2",
    name: "John Doe",
    image:
      "https://media0.giphy.com/media/LmBsnpDCuturMhtLfw/giphy.gif?cid=ecf05e472ib0lizs11nrtt7jccmrcrthzxhz9qnfzxziatoo&ep=v1_gifs_search&rid=giphy.gif&ct=g",
  },
})
