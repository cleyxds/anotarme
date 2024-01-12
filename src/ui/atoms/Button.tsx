import styled from "styled-components"

export const Button = styled.button`
  color: var(--BLACK-I);
  font-size: 0.75rem;
  padding: 0.25rem 1rem;
  border: 2px solid var(--BLACK-I);
  border-radius: 3px;
  font-family: "Hackernoon-v2";
  background-color: transparent;
  transition: all 0.7s;

  &:hover {
    background-color: var(--GREEN-XII);
    transition: all 0.7s;
  }
`
