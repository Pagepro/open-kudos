import { AnyAction } from "redux"
import { tokenActions } from "../../setup/actions";
import { getAuthToken } from "../../setup/interceptors/utils"

const defaultState = getAuthToken()

const token = (state = defaultState, action: AnyAction) => {
  const {
    type,
    payload
  } = action

  switch (type) {
    case tokenActions.addToken:
      return payload
    case tokenActions.removeToken:
      return String.empty
    default:
      return state
  }
}

export default token
