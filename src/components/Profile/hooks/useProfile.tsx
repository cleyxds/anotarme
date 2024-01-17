import { useMemo } from "react"

import { useParams } from "react-router-dom"

import { useRecoilValue } from "recoil"
import { UserAtom } from "../../../atoms/User"

export function useProfile() {
  const { userId } = useParams()

  const user = useRecoilValue(UserAtom)

  const profile = useMemo(
    () => ({
      image: user?.image,
      name: user?.name,
    }),
    [user?.image, user?.name]
  )

  return { userId, profile }
}
