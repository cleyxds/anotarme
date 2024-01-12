import styled from "styled-components"

import { MI } from "../../types/mapping"

type TextTypes = "V1" | "V2"
type ColorPalette =
  | "GREEN-I"
  | "GREEN-II"
  | "GREEN-III"
  | "GREEN-IV"
  | "GREEN-V"
  | "GREEN-VI"
  | "GREEN-VII"
  | "GREEN-VIII"
  | "GREEN-IX"
  | "GREEN-X"
  | "GREEN-XI"
  | "GREEN-XII"

type TextTypeProps = {
  type?: TextTypes
  color?: ColorPalette
}

const selectFontFamily = (type = "V1") => {
  const fonts: MI = {
    V1: "Hackernoon-v1",
    V2: "Hackernoon-v2",
  }

  return fonts[type]
}

const selectColor = (color = "GREEN-VI") => `var(--${color})`

export const Text = styled.h1<TextTypeProps>`
  color: ${({ color }) => selectColor(color)};
  font-size: 2rem;
  line-height: 2.5rem;
  font-family: ${({ type }) => selectFontFamily(type)};
`
