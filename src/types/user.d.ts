export type User = {
  id: string
  status: string
  createdAt: string
  activatedAt: string | null
  statusChanged: string
  lastLogin: string
  lastUpdated: string
  passwordChangedAt: string
  profile: ProfileType
  credentials: CredentialsType
  locale: string
}

type ProfileType = {
  firstName: string
  lastName: string
  email: string
  login: string
  phone: string
  avatar_url: string | null
}

type CredentialsType = {
  provider: string
}
