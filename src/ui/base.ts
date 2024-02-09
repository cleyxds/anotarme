import { css } from "styled-components"

const baseShadow = css`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

const baseSuissetIntlRegular = css`
  font-family: "SuissetIntl Regular", sans-serif;
  font-weight: 700;
`

const baseModal = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  min-width: calc(320px - 4rem);
  max-width: 100dvw;
  padding: 1rem;
  gap: 1rem;
  background-color: var(--BLACK-I);
  border-radius: 10px;
`

export { baseShadow, baseSuissetIntlRegular, baseModal }
