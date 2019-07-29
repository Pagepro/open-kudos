import { common } from "../const";

export const getAuthToken = () => {
  const accessToken = localStorage.getItem(common.accessTokenKey)

  return accessToken || String.empty
}

export const setAuthToken = (token: string) => {
  localStorage.setItem(common.accessTokenKey, token)
}

export const clearAuthToken = () => {
  localStorage.removeItem(common.accessTokenKey)
}
