import styled from "styled-components"

import { baseSuissetIntlRegular } from "../base"

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  color: var(--BLACK-I);
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: 0.8px solid var(--BLACK-I);
  background-color: var(--WHITE-I);
  transition: background-color 0.3s;
  ${baseSuissetIntlRegular}

  height: 2rem;
  min-width: auto;

  &:hover {
    background-color: var(--GREEN-XII);
    transition: background-color 0.3s;
  }
`
