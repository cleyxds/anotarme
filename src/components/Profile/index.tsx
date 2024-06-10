import styled from "styled-components"

import { useProfile } from "./hooks/useProfile"

import { Screen } from "../../ui/Screen"
import { Text } from "../../ui/atoms/Text"

import { Header } from "../Header"
import { Footer } from "../Footer"
import { ChatProfileImage } from "../Chat/components/ChatProfile"
import { ArchivedChatsModal } from "./ArchivedChatsModal"

export function Profile() {
  const { profile, userId } = useProfile()

  return (
    <ProfileScreen>
      <Header preset="PROFILE" />

      {profile && (
        <UserProfileContainer>
          <ChatProfileImage src={profile.image} alt={`${profile.name} Image`} />

          <Text size="small" type="SUISSETINTLBOLD">
            {profile.name}
          </Text>
        </UserProfileContainer>
      )}

      {profile && (
        <ProfileContainer>
          <ArchivedChatsModal userId={userId!} />
        </ProfileContainer>
      )}

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
  gap: 0.5rem;
`
