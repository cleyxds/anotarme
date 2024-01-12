import styled from "styled-components"

import { Screen } from "../ui/Screen"
import { Text } from "../ui/atoms/Text"

import { Header } from "./Header"

export function Landing() {
  return (
    <Screen>
      <Header />

      <LandingInfoContainer>
        <LandingInfoContent>
          <Text type="V2" color="GREEN-X">
            Escreva as suas besteiras conosco 😎
          </Text>

          <Text>Relembre as suas ideias anotando-as aqui!</Text>
        </LandingInfoContent>

        <div>
          <LandingImage src="/favicon.svg" alt="Landing page image" />
        </div>
      </LandingInfoContainer>
    </Screen>
  )
}

const LandingInfoContainer = styled.div`
  padding: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media (max-width: 700px) {
    flex-direction: column;
    row-gap: 2rem;
  }
`

const LandingInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;

  @media (max-width: 700px) {
    width: auto;
  }
`

const LandingImage = styled.img`
  width: 18.75rem;
  height: 18.75rem;

  @media (max-width: 320px) {
    background-color: var(--WHITE-I);
  }
`
