import { Dispatch } from 'redux'
import { tokenActions } from '../../setup/actions'
import { setAuthToken, clearAuthToken } from '../../setup/interceptors/utils'

export const login = (token: string) =>
  (dispatch: Dispatch<any>) => {
    setAuthToken(token)

    dispatch({
      payload: token,
      type: tokenActions.addToken
    })
  }

export const logout = () =>
  (dispatch: Dispatch<any>) => {
    clearAuthToken()

    dispatch({
      type: tokenActions.removeToken
    })
  }
