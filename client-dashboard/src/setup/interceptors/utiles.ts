import { common } from "../const/common";

export const getAuthToken = () => {
  const accessToken = localStorage.getItem(common.accessTokenKey);
  return accessToken || ""
}
