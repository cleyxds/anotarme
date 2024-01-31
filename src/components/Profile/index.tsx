import styled from "styled-components"

import { useProfile } from "./hooks/useProfile"

import { Screen } from "../../ui/Screen"
import { Text } from "../../ui/atoms/Text"
import { Header } from "../Header"
import { Footer } from "../Footer"
import { ArchivedChatsModal } from "./ArchivedChatsModal"

export function Profile() {
  const { profile } = useProfile()

  const PROFILE_IMAGE_ALT = `${profile.name} image`

  return (
    <ProfileScreen>
      <Header />

      <UserProfileContainer>
        <ProfileImage src={profile.image} alt={PROFILE_IMAGE_ALT} />

        <Text size="small" type="V2">
          {profile.name}
        </Text>
      </UserProfileContainer>

      <ProfileContainer>
        <ArchivedChatsModal />
      </ProfileContainer>

      <Footer />
    </ProfileScreen>
  )
}

const ProfileScreen = styled(Screen)`
  gap: 1.5rem;
  padding-bottom: 4rem;
`

const ProfileContainer = styled.div`
  padding: 0 4rem;
`

const UserProfileContainer = styled(ProfileContainer)`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const ProfileImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  object-fit: cover;
`
