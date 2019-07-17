import { Dispatch } from 'redux'
import { common } from '../../setup/const'
import { tokenActions } from '../../setup/actions'
import { setAuthToken } from '../../setup/interceptors/utiles';

export const addToken = (token: string) =>
  (dispatch: Dispatch<any>) => {
    setAuthToken(token)

    dispatch({
      payload: token,
      type: tokenActions.addToken
    })
  }
