import { ReactNode } from "react"

import { RecoilRoot } from "recoil"

export function DataRoot({ children }: { children: ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>
}
