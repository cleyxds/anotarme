import { AUTH_SERVICE, USERS_SERVICE } from "./axios"

export async function getMe(authToken: string) {
  const config = {
    method: "GET",
    url: "/users/me",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }

  const response = await USERS_SERVICE(config)

  return response.data
}

export async function verifyToken(token: string) {
  const data = { token }

  const config = {
    method: "POST",
    url: "/auth/token",
    headers: {
      accept: "application/json, text/plain, */*",
      "content-type": "application/json",
    },
    data,
  }

  const response = await AUTH_SERVICE(config)

  return response.data
}
