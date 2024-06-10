import { useState } from "react"

import styled, { keyframes } from "styled-components"

import DEFAULT_IMAGE_SRC from "../assets/images/DefaultUserImage.png"

const Image = styled.img``

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function OptimizedImage({ src, alt, ...props }: HTMLImageElement & any) {
  const [imageSrc, setImageSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setImageSrc(DEFAULT_IMAGE_SRC)
    setIsLoading(false)
  }

  return (
    <RelativeContainer>
      <Image
        src={imageSrc}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...props}
      />

      {isLoading && <Spinner />}
    </RelativeContainer>
  )
}

const RelativeContainer = styled.div`
  position: relative;
`

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.span`
  width: 2rem;
  height: 2rem;
  border: 2px solid var(--GREEN-VI);
  border-bottom-color: transparent;
  border-radius: 9999px;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
  position: absolute;
  top: 17%;
  left: 17%;
  transform: translate(-17%, -17%);

  z-index: 50;
`
