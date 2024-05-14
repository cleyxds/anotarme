export type User = {
  id: string
  status: string
  createdAt: string
  activatedAt: string | null
  statusChanged: string
  lastLogin: string
  lastUpdated: string
  passwordChangedAt: string
  profile: Profile
  credentials: CredentialsType
  locale: string
  hideTitle?: boolean
}

type ProfileType = {
  firstName: string
  lastName: string
  email: string
  login: string
  phone: string
  avatar_url: string | null
}

type Profile = ProfileType

type CredentialsType = {
  provider: string
}
