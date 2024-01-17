import styled from "styled-components"

import { Screen } from "../../ui/Screen"
import { Header } from "../Header"
import { Footer } from "../Footer"
import { Text } from "../../ui/atoms/Text"

import { useProfile } from "./hooks/useProfile"

export function Profile() {
  const { profile } = useProfile()

  const PROFILE_IMAGE_ALT = `${profile.name} image`

  return (
    <ProfileScreen>
      <Header />

      <ProfileContainer>
        <ProfileImage src={profile.image} alt={PROFILE_IMAGE_ALT} />

        <Text size="small" type="V2">
          {profile.name}
        </Text>
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
