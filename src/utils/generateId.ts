export function generateId() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const idLength = 8

  let id = ""

  for (let i = 0; i < idLength; i++) {
    const index = Math.floor(Math.random() * chars.length)

    id += chars.charAt(index)
  }

  return id
}
