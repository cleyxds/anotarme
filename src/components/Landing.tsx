import styled from "styled-components"

import { Screen } from "../ui/Screen"
import { Text } from "../ui/atoms/Text"

import { Header } from "./Header"
import { Footer } from "./Footer"

const LANDING_GIF_URL =
  "https://media0.giphy.com/media/LmBsnpDCuturMhtLfw/giphy.gif?cid=ecf05e472ib0lizs11nrtt7jccmrcrthzxhz9qnfzxziatoo&ep=v1_gifs_search&rid=giphy.gif&ct=g"

export function Landing() {
  return (
    <Screen>
      <Header />

      <LandingInfoContainer>
        <LandingInfoContent>
          <Text type="V2" color="GREEN-X">
            Escreva suas besteiras conosco 😎
          </Text>

          <Text type="V2">Relembre as suas ideias anotando-as aqui!</Text>
        </LandingInfoContent>

        <div>
          <LandingImage src={LANDING_GIF_URL} alt="Landing page image" />
        </div>
      </LandingInfoContainer>

      <Footer />
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
  border-radius: 8px;

  @media (max-width: 320px) {
    background-color: var(--WHITE-I);
  }

  @media (max-width: 700px) {
    width: auto;
  }
`
