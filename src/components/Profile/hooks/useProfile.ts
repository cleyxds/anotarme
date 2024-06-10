import { useMemo } from "react"

import { useParams } from "react-router-dom"

import { useRecoilValue } from "recoil"
import { UserAtom } from "../../../atoms/User"

import DEFAULT_IMAGE_SRC from "../../../assets/images/DefaultUserImage.png"

export function useProfile() {
  const { userId } = useParams()

  const user = useRecoilValue(UserAtom)

  const profile = useMemo(() => {
    if (!user?.id) return null

    const FULL_NAME = `${user?.profile.firstName} ${user?.profile.lastName}`

    const USER_IMAGE = user?.profile.avatar_url

    const image = USER_IMAGE ? USER_IMAGE : DEFAULT_IMAGE_SRC

    return {
      name: FULL_NAME,
      image,
    }
  }, [
    user?.id,
    user?.profile.avatar_url,
    user?.profile.firstName,
    user?.profile.lastName,
  ])

  return { userId, profile }
}
