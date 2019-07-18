import axios from 'axios'
import { Dispatch } from 'redux'
import { tokenActions } from '../../setup/actions'
import { clearAuthToken, setAuthToken } from '../../setup/interceptors/utils'

export const login = (token: string) =>
  (dispatch: Dispatch<any>) => {
    setAuthToken(token)

    dispatch({
      payload: token,
      type: tokenActions.addToken
    })
  }

export const logout = () =>
  async (dispatch: Dispatch<any>) => {
    try {
      await axios.get('/auth/logout')
      clearAuthToken()
    } catch (error) { }

    dispatch({
      type: tokenActions.removeToken
    })
  }
