import styled from "styled-components"

export function Footer() {
  return <FooterContainer>Hello</FooterContainer>
}

const FooterContainer = styled.footer`
  background-color: var(--BLACK-I);
  color: white;
  min-height: 3rem;

  display: flex;
  padding: 1rem 4rem;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`
