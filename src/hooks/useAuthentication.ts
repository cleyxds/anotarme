import { useCallback } from "react"

import { useResetRecoilState } from "recoil"
import { AuthAtom } from "../atoms/Auth"
import { UserAtom } from "../atoms/User"

export function useAuthentication() {
  const resetUserAtom = useResetRecoilState(UserAtom)
  const resetAuthAtom = useResetRecoilState(AuthAtom)

  const logout = useCallback(() => {
    resetAuthAtom()
    resetUserAtom()
  }, [resetAuthAtom, resetUserAtom])

  return { logout }
}
