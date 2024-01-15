import styled from "styled-components"

import { MI } from "../../types/mapping"

type TextTypes = "V1" | "V2" | "SFPROREGULAR" | "SFPROMEDIUM" | "SFPROBOLD"
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
  | "BLACK-I"

type TextSizes = "smallest" | "small" | "medium" | "large"

type TextTypeProps = {
  type?: TextTypes
  color?: ColorPalette
  size?: TextSizes
  capitalize?: boolean
}

const selectFontFamily = (type = "V1") => {
  const fonts: MI = {
    V1: "Hackernoon-v1",
    V2: "Hackernoon-v2",
    SFPROREGULAR: "SF Pro Display Regular",
    SFPROMEDIUM: "SF Pro Display Medium",
    SFPROBOLD: "SF Pro Display Bold",
  }

  return fonts[type]
}

const selectColor = (color = "GREEN-VI") => `var(--${color})`

const selectFontSize = (type: TextSizes = "large") => {
  const sizes = {
    smallest: ".5rem",
    small: "1rem",
    medium: "1.5rem",
    large: "2rem",
  }

  return sizes[type]
}

const selectLineHeight = (type: TextSizes = "large") => {
  const sizes = {
    smallest: "1rem",
    small: "1.5rem",
    medium: "2rem",
    large: "2.5rem",
  }

  return sizes[type]
}

export const Text = styled.h1<TextTypeProps>`
  color: ${({ color }) => selectColor(color)};
  font-size: ${({ size }) => selectFontSize(size)};
  line-height: ${({ size }) => selectLineHeight(size)};
  font-family: ${({ type }) => selectFontFamily(type)};

  ${({ capitalize }) =>
    capitalize && {
      textTransform: "capitalize",
    }}
`
