import styled from "styled-components"

import Logo from "../images/logo.jpg"

const SvgComponent = () => <StyledLogo src={Logo} alt="Logo" />

const StyledLogo = styled.img`
  width: 2.5em;
  height: 2.5em;
`

export default SvgComponent
