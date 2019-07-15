import { common } from "../const";

export const getAuthToken = () => {
  const accessToken = localStorage.getItem(common.accessTokenKey)

  return accessToken || String.empty
}
