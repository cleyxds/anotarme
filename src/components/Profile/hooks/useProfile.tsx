import { useMemo } from "react"

import { useParams } from "react-router-dom"

import { useRecoilValue } from "recoil"
import { UserAtom } from "../../../atoms/User"

export function useProfile() {
  const { userId } = useParams()

  const user = useRecoilValue(UserAtom)

  const profile = useMemo(() => {
    const FULL_NAME = `${user?.profile.firstName} ${user?.profile.lastName}`

    const USER_IMAGE = user?.profile.avatar_url

    const image = USER_IMAGE ? USER_IMAGE : "/DefaultUserImage.png"

    return {
      name: FULL_NAME,
      image,
    }
  }, [
    user?.profile.avatar_url,
    user?.profile.firstName,
    user?.profile.lastName,
  ])

  return { userId, profile }
}
