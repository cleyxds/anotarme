import { atom } from "recoil"

import { User } from "../../types/user"

const DEFAULT_USER = {
  id: "01HM53D54VXQ5B965YYM2M4VWE",
  name: "John Doe",
  image:
    "https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0",
}

export const UserAtom = atom<User | null>({
  key: "UserAtomKey",
  default: DEFAULT_USER,
})
