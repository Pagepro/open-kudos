import { Dispatch } from 'redux'
import { userRoleActions } from '../../setup/actions'
import { IUserRole } from '../../components/settings/models/IUserRole'

export const setUserRole = (role: IUserRole) =>
  (dispatch: Dispatch<any>) => {

    dispatch({
      payload: role,
      type: userRoleActions.setUserRole
    })
  }
