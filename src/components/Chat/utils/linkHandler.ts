export const hasLink = (text: string) => /(https?:\/\/[^\s]+)/g.test(text)

export function extractLink(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const matches = text.match(urlRegex)
  return matches ? matches[0] : text
}
