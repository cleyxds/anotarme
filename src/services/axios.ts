import axios from "axios"

export const USERS_SERVICE = axios.create({
  baseURL: "https://barbosarecipes-services-2zf2mk77yq-uc.a.run.app",
  timeout: 5000,
})

export const AUTH_SERVICE = axios.create({
  baseURL: "https://barbosarecipes-auth-2zf2mk77yq-uc.a.run.app",
  timeout: 5000,
})
