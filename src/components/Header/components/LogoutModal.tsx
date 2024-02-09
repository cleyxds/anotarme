import { useState } from "react"

import styled from "styled-components"

import { Dialog } from "@headlessui/react"

import { Text } from "../../../ui/atoms/Text"
import { Button } from "../../../ui/atoms/Button"

import { LinkButton } from "../../LinkButton"
import { Backdrop, ScrollablePanel, Wrapper } from "../../Modal/components"

export function LogoutModal({ logout }: { logout: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <>
      <Button onClick={handleOpen}>Sair</Button>

      <Dialog open={isOpen} onClose={handleClose} className="fixed z-50">
        <Backdrop />

        <ScrollablePanel>
          <Wrapper>
            <Dialog.Panel>
              <LogoutModalContainer>
                <Text size="medium" color="WHITE-I" type="SUISSETINTLBOLD">
                  Tem certeza que deseja sair?
                </Text>

                <div className="flex w-full gap-4">
                  <LinkButton to="/" className="w-1/2" onClick={logout}>
                    Sair
                  </LinkButton>

                  <Button className="w-1/2" onClick={handleClose}>
                    Ficar
                  </Button>
                </div>
              </LogoutModalContainer>
            </Dialog.Panel>
          </Wrapper>
        </ScrollablePanel>
      </Dialog>
    </>
  )
}

const LogoutModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background-color: var(--BLACK-I);
`
