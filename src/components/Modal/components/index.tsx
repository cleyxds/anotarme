import styled from "styled-components"

export const Backdrop = styled.div.attrs({ "aria-hidden": true })`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
`

export const ScrollablePanel = styled.div`
  position: fixed;
  inset: 0;
  width: 100dvw;
  overflow-y: auto;
`

export const Wrapper = styled.div`
  display: flex;
  min-height: 100%;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`
